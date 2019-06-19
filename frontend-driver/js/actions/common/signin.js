import { Actions, ActionConst } from "react-native-router-flux";

import config from "../../../config.js";
import { Toast } from "native-base";
import _ from "lodash"


export const DRIVER_LOGIN_SUCCESS = "DRIVER_LOGIN_SUCCESS";
export const DRIVER_LOGIN_ERROR = "DRIVER_LOGIN_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_RESPONSE_RECEIVED = "LOGIN_RESPONSE_RECEIVED";
export const CHANGE_LOGIN_ERROR_STATUS = "CHANGE_LOGIN_ERROR_STATUS";

export function driverSigninSuccess(data) {
  return {
    type: DRIVER_LOGIN_SUCCESS,
    payload: data
  };
}

export function driverSigninError(error) {
  return {
    type: DRIVER_LOGIN_ERROR,
    payload: error
  };
}
export function logOutUser() {
  return {
    type: LOGOUT_USER
  };
}
export function logOutUserAsync(jwtAccessToken) {
  return dispatch => {
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === true) {
          dispatch(logOutUser());
          Actions.login({ type: ActionConst.RESET });
        }
      })
      .catch(e => e);
    dispatch(logOutUser());
    Actions.login({ type: ActionConst.RESET });
  };
}
export function signinAsync(obj) {
  const userCredentials = obj;
  userCredentials.userType = "driver";
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          Toast.show({
            text: "Already Registered as Rider",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === true && userCredentials.userType === "driver") {
          dispatch(driverSigninSuccess(data));
          dispatch(Actions.driverStartupService());
        }
        if (data.success === false && userCredentials.userType === "rider") {
          Toast.show({
            text: "User doesn't Exists",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "driver") {
          dispatch(driverSigninError(data));
          dispatch({ type: CHANGE_LOGIN_ERROR_STATUS });
        }
      })
      .catch(e => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}

export function signinAsyncFb(obj) {
  const userCredentials = obj;
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          Toast.show({
            text: "User Already Exists",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === true && userCredentials.userType === "driver") {
          dispatch(driverSigninSuccess(data));
          dispatch(Actions.driverStartupService());
        }
        if (data.success === false && userCredentials.userType === "rider") {
          Toast.show({
            text: "User Already Exists",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "driver") {
          dispatch(driverSigninError(data));
        }
      })
      .catch(e => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}
export function forgotMail() {
  return (dispatch, getState) => {
    const obj = {
      email: _.get(getState().form.login.values, "email", null)
    };
    if (obj.email === null) {
      Toast.show({
        text: "email is required",
        position: "bottom",
        duration: 1500
      });
    } else {
      fetch(`${config.serverSideUrl}:${config.port}/api/config/forgot`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(resp => resp.json())
        .then(data => {
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 1500
          });
        })
        .catch(e => {
          Toast.show({
            text: "User doesn't Exists",
            position: "bottom",
            duration: 1500
          });
        });
    }
  };
}
