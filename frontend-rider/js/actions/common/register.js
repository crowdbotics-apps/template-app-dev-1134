import { Actions, ActionConst } from "react-native-router-flux";
import { Alert } from "react-native";
import { Toast } from "native-base";
import config from "../../../config.js";

export const RIDER_REGISTER_SUCCESS = "RIDER_REGISTER_SUCCESS";
export const RIDER_REGISTER_ERROR = "RIDER_REGISTER_ERROR";
export const REQUEST_REGISTERATION = "REQUEST_REGISTERATION";
export const REGISTRATION_RESPONSE_RECEIVED = "REGISTRATION_RESPONSE_RECEIVED";

export function riderRegisterSuccess(data) {
  return {
    type: RIDER_REGISTER_SUCCESS,
    payload: data
  };
}

export function riderRegisterError(error) {
  return {
    type: RIDER_REGISTER_ERROR,
    payload: error
  };
}

export function registerAsync(obj) {
  const userCredentials = obj;
  userCredentials.userType = "rider";
  userCredentials.phoneNo = `+${userCredentials.callingCode}${
    userCredentials.phoneNo
  }`;
  return dispatch => {
    dispatch({ type: REQUEST_REGISTERATION });
    fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          if (data.data.user.isApproved) {
            dispatch(riderRegisterSuccess(data));
            dispatch(Actions.riderStartupService());
          } else {
            Alert.alert(
              "Registration Approval",
              "Your account will be updated in next 24Hrs."
            );
            dispatch(Actions.login({ type: ActionConst.RESET }));
          }
        }
        if (data.success === true && userCredentials.userType === "driver") {
          Toast.show({
            text: "Already Registered as Driver",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "rider") {
          dispatch(riderRegisterError(data));
        }
      })
      .catch(e => {
        dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      });
  };
}

//
// Registration using fb
//
export function registerAsyncFb(obj) {
  const userCredentialsFb = obj;
  userCredentialsFb.phoneNo = `+${userCredentialsFb.callingCode}${
    userCredentialsFb.phoneNo
  }`;
  return (dispatch, getState) => {
    const state = getState();
    userCredentialsFb.password = state.entrypage.socialLogin.id;
    userCredentialsFb.profileUrl = state.entrypage.socialLogin.profileUrl;
    if (!userCredentialsFb.message) {
      dispatch({ type: REQUEST_REGISTERATION });
      fetch(`${config.serverSideUrl}:${config.port}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentialsFb)
      })
        .then(resp => {
          resp.json().then(data => {
            dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
            if (
              data.success === true &&
              userCredentialsFb.userType === "rider"
            ) {
              if (data.data.user.isApproved) {
                dispatch(riderRegisterSuccess(data));
                dispatch(Actions.riderStartupService());
              } else {
                Alert.alert(
                  "Registration Approval",
                  "Your account will be updated in next 24Hrs."
                );
                dispatch(Actions.login({ type: ActionConst.RESET }));
              }
            }
            if (
              data.success === false &&
              userCredentialsFb.userType === "rider"
            ) {
              if (data.message === "user already exist") {
                dispatch(riderRegisterSuccess(data));
                dispatch(Actions.riderStartupService());
              } else {
                dispatch(riderRegisterError(data));
              }
            }
          });
        })
        .catch(e => {
          dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
        });
    } else {
      dispatch({ type: REGISTRATION_RESPONSE_RECEIVED });
      if (obj.success === true && obj.data.user.userType === "rider") {
        dispatch(riderRegisterSuccess(obj));
        dispatch(Actions.riderStartupService());
      }
      if (obj.success === true && obj.data.user.userType === "driver") {
        Toast.show({
          text: "Already Registered as Driver",
          position: "bottom",
          duration: 1500
        });
      }
    }
  };
}
