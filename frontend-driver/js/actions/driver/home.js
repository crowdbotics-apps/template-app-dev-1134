import config from "../../../config";
import { updateLocation } from "../../services/driversocket";
import { setCurrentMapDriver } from "../../components/driver/rootView";

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const NEW_RIDE_REQUEST = "NEW_RIDE_REQUEST";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";
export const CHANGE_PAGE_STATUS = "CHANGE_PAGE_STATUS";
export const TRIP_REQUEST_SYNC_COMPLETED = "TRIP_REQUEST_SYNC_COMPLETED";
export const TRIP_SYNC_COMPLETED = "TRIP_SYNC_COMPLETED";
export const NOT_IN_ANY_CURRENT_RIDE = "NOT_IN_ANY_CURRENT_RIDE";
export const SET_INITIAL_USER_LOCATION = "SET_INITIAL_USER_LOCATION";
export const SET_DEVICE_ID_AND_PUSH_TOKEN = "SET_DEVICE_ID_AND_PUSH_TOKEN";
export const DRIVER_HAS_ARRIVED = "DRIVER_HAS_ARRIVED";
export const LOCATION_NOT_FOUND = "LOCATION_NOT_FOUND";
export const PREDICTION_RESPONSE_RECEIVED = "PREDICTION_RESPONSE_RECEIVED";

export function setUserLocation(position) {
  return {
    type: SET_USER_LOCATION,
    payload: position.coords
  };
}
export function setInitialUserLocation(position) {
  return {
    type: SET_INITIAL_USER_LOCATION,
    payload: position.coords
  };
}
export function newRideRequest(tripRequest) {
  return dispatch => {
    dispatch({ type: NEW_RIDE_REQUEST, payload: tripRequest });
    dispatch({ type: CHANGE_PAGE_STATUS, payload: "rideRequest" });
  };
}
export function socketDisconnected(flag) {
  return {
    type: SOCKET_DISCONNECTED,
    payload: flag
  };
}
export function changePageStatus(newPage) {
  return {
    type: CHANGE_PAGE_STATUS,
    payload: newPage
  };
}
export function tripRequestSyncCompleted(data) {
  return {
    type: TRIP_REQUEST_SYNC_COMPLETED,
    payload: data
  };
}
export function tripSyncCompleted(data) {
  return {
    type: TRIP_SYNC_COMPLETED,
    payload: data
  };
}
export function notInAnyCurrentRide(gpsLoc) {
  return {
    type: NOT_IN_ANY_CURRENT_RIDE,
    payload: gpsLoc
  };
}

export function currentLocationDriver() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(location => {
      setCurrentMapDriver();
    });
    navigator.geolocation.watchPosition(
      position => {
        dispatch(setUserLocation(position));
        updateLocation(getState().driver.user);
      },
      error => {
        console.log(error, "watch Error ");
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };
}

export function syncDataAsync(jwtAccessToken) {
  return (dispatch, getState) =>
    fetch(`${config.serverSideUrl}:${config.port}/api/syncData`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (
          data.success === true &&
          data.data.tripRequest != null &&
          data.data.trip === null
        ) {
          if (data.data.tripRequest.tripRequestStatus === "arrived") {
            dispatch({
              type: DRIVER_HAS_ARRIVED,
              payload: data.data.tripRequest
            });
          } else {
            dispatch(tripRequestSyncCompleted(data.data.tripRequest));
          }
        } else if (
          data.success === true &&
          data.data.tripRequest === null &&
          data.data.trip != null
        ) {
          dispatch(tripSyncCompleted(data.data.trip));
        } else {
          const gpsLoc = getState().driver.user.gpsLoc;
          dispatch(notInAnyCurrentRide(gpsLoc));
        }
      })
      .catch(err => err);
}

export function fetchUserCurrentLocationAsync() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch(setInitialUserLocation(position));
        updateLocation(getState().driver.user); //test
      },
      () => dispatch({ type: LOCATION_NOT_FOUND }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    navigator.geolocation.watchPosition(
      position => {
        dispatch(setUserLocation(position));
        updateLocation(getState().driver.user);
      },
      error => {
        console.log(error, "watch Error ");
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };
}

export function fetchPrediction(queryString) {
  return (dispatch, getState) => {
    const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
      getState().basicAppConfig.config.googleMapsApiKey
    }&input=${queryString}&location=${getState().driver.user.gpsLoc[1]},${
      getState().driver.user.gpsLoc[0]
    }&radius=50000`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: PREDICTION_RESPONSE_RECEIVED,
          payload: responseJson.predictions
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken) {
  return (dispatch, getState) => {
    const requestObj = {
      jwtAccessToken,
      deviceId,
      pushToken,
      fname: getState().driver.user.fname,
      lname: getState().driver.user.lname,
      phoneNo: getState().driver.user.phoneNo,
      isAvailable: getState().driver.user.isAvailable
    };
    fetch(`${config.serverSideUrl}:${config.port}/api/users`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      },
      body: JSON.stringify(requestObj)
    })
      .then(resp => resp.json())
      .then(() => {
        dispatch({ type: SET_DEVICE_ID_AND_PUSH_TOKEN, deviceId, pushToken });
      })
      .catch(e => console.log("failed to set device id", e));
  };
}
