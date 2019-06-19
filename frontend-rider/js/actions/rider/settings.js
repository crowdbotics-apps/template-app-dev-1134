import { Toast } from "native-base";
import config from "../../../config.js";
import { Actions } from "react-native-router-flux";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const SET_HOME_ADDRESS = "SET_HOME_ADDRESS";
export const SET_WORK_ADDRESS = "SET_WORK_ADDRESS";
export const PROFILE_PROGRESS = "PROFILE_PROGRESS";

export function profileUpdated(data) {
  return {
    type: PROFILE_UPDATED,
    payload: data
  };
}

export function profileProgress() {
  return {
    type: PROFILE_PROGRESS
  };
}

export function setHomeAddress(address) {
  return {
    type: SET_HOME_ADDRESS,
    payload: address
  };
}

export function setWorkAddress(address) {
  return {
    type: SET_WORK_ADDRESS,
    payload: address
  };
}

//DDT
export function updateUserProfileAsync(userDetails) {
  //console.error(JSON.stringify(userDetails))
  return (dispatch, getState) => {
    //userDetails.jwtAccessToken = getState().rider.appState.jwtAccessToken;
    fetch(`${config.serverSideUrl}:${config.port}/api/users`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: '', //userDetails.jwtAccessToken,
      },
      body: JSON.stringify(userDetails)
    })
      .then(resp => resp.json())
      .then(data => {
        // console.error('hey', data)
        dispatch(profileUpdated(data));
        Actions.pop();
        Toast.show({
          text: "Profile Updated",
          position: "bottom",
          duration: 1500
        });
      })
      .catch(e => {
        console.error(e)
        Toast.show({
          text: "Error while updating profile",
          position: "bottom",
          duration: 1500
        });
      });
  };
}

export function updateUserProfilePicAsync(userDetails, type) {
  return (dispatch, getState) => {
    dispatch(profileProgress());
    // userDetails.jwtAccessToken = getState().rider.appState.jwtAccessToken;
    const imageData = new FormData();
    imageData.append("image", {
      uri: userDetails.localUrl,
      name: `${userDetails.fname}.jpg`,
      type: "image/jpg"
    });
    imageData.append(userDetails);
    imageData.append("updateType", type);
    fetch(`${config.serverSideUrl}:${config.port}/api/users/upload`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
        Authorization: '',//getState().rider.appState.jwtAccessToken,
        updateType: type
      },
      body: imageData
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          dispatch(profileUpdated(data));
        } else {
          Toast.show({
            text: "Error while updating profile",
            position: "bottom",
            duration: 1500
          });
        }
      })
      .catch(e => {
        console.error(e)
        Toast.show({
          text: "Error while updating profile",
          position: "bottom",
          duration: 1500
        });
      });
  };
}
