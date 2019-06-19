import config from "../../../config";
import { updateLocation } from "../../services/ridersocket";
import { setCurrentMap } from "../../components/rider/rootView";

export const SET_INITIAL_USER_LOCATION = "SET_INITIAL_USER_LOCATION";
export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const CHANGE_REGION = "CHANGE_REGION";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";
export const TRIP_REQUEST_SYNC_COMPLETED = "TRIP_REQUEST_SYNC_COMPLETED";
export const TRIP_SYNC_COMPLETED = "TRIP_SYNC_COMPLETED";
export const NOT_IN_ANY_CURRENT_RIDE = "NOT_IN_ANY_CURRENT_RIDE";
export const CLEAR_TRIP_AND_TRIPREQUEST = "CLEAR_TRIP_AND_TRIPREQUEST";
export const CHANGE_PAGE_STATUS = "CHANGE_PAGE_STATUS";
export const SET_FAKE_LOCATION = "SET_FAKE_LOCATION";
export const NEARBY_DRIVERS_LIST = "NEARBY_DRIVERS_LIST";
export const MAP_DEVICE_ID_TO_USER = "MAP_DEVICE_ID_TO_USER";
export const SET_DEVICE_ID_AND_PUSH_TOKEN = "SET_DEVICE_ID_AND_PUSH_TOKEN";
export const LOCATION_NOT_FOUND = "LOCATION_NOT_FOUND";
export const PREDICTION_RESPONSE_RECEIVED = "PREDICTION_RESPONSE_RECEIVED";
export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY";
export const SET_CURRENT_USER_LOCATION = "SET_CURRENT_USER_LOCATION";
export const SET_SRC_LOCC = "SET_SRC_LOCC";

export const SET_CURRENT_ADDRESS = "SET_CURRENT_ADDRESS";
export const SET_PICKUP_ADDRESS = "SET_PICKUP_ADDRESS";

export function setCurrentAddress(address) {
  return {
    type: SET_CURRENT_ADDRESS,
    payload: address.results[0].formatted_address
  };
}
export function setPickupAddress(address) {
  return {
    type: SET_PICKUP_ADDRESS,
    payload: address.results[0].formatted_address
  };
}

export function setUserLocation(position) {
  return {
    type: SET_USER_LOCATION,
    payload: position.coords
  };
}
export function setSrcLoc(position) {
  return {
    type: SET_SRC_LOCC,
    payload: position.coords
  };
}
export function setModalVisible(visible) {
  return {
    type: SET_MODAL_VISIBILITY,
    payload: visible
  };
}
export function fetchPrediction(queryString) { //DDT suggestion
  return (dispatch, getState) => {
    const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${
      getState().basicAppConfig.config.googleMapsApiKey
    }&input=${queryString}&location=${getState().rider.user.gpsLoc[1]},${
      getState().rider.user.gpsLoc[0]
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
export function setInitialUserLocation(position) {
  return {
    type: SET_INITIAL_USER_LOCATION,
    payload: position.coords
  };
}
export function setCurrentUserLocation(position) {
  return {
    type: SET_CURRENT_USER_LOCATION,
    payload: position.coords
  };
}
export function clearTripAndTripRequest() {
  return {
    type: CLEAR_TRIP_AND_TRIPREQUEST
  };
}
export function changePageStatus(newPage) {
  return {
    type: CHANGE_PAGE_STATUS,
    payload: newPage
  };
}
export function changeRegion(region) {
  return {
    type: CHANGE_REGION,
    payload: region
  };
}
export function socketDisconnected(flag) {
  return {
    type: SOCKET_DISCONNECTED,
    payload: flag
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

export function currentLocation() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(location => {
      setCurrentMap(location);
      dispatch(setCurrentUserLocation(location));
      dispatch(setSrcLoc(location));
    });

    navigator.geolocation.watchPosition(position => {
      dispatch(setUserLocation(position));
      dispatch(setSrcLoc(position));
      updateLocation(getState().rider.user);
    });
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
          dispatch(tripRequestSyncCompleted(data.data.tripRequest));
        } else if (
          data.success === true &&
          data.data.tripRequest === null &&
          data.data.trip != null
        ) {
          dispatch(tripSyncCompleted(data.data.trip));
        } else {
          const gpsLoc = getState().rider.user.gpsLoc;
          // dispatch(notInAnyCurrentRide(gpsLoc));
        }
      })
      .catch(err => err);
}
export function fetchUserCurrentLocationAsync() {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch(setInitialUserLocation(position));
        updateLocation(getState().rider.user); //test
      },
      () => dispatch({ type: LOCATION_NOT_FOUND })
    );
    navigator.geolocation.watchPosition(position => {
      dispatch(setUserLocation(position));
      dispatch(setSrcLoc(position));
      updateLocation(getState().rider.user);
    });
  };
}
export function nearByDriversList(driversArray) {
  return {
    type: NEARBY_DRIVERS_LIST,
    payload: driversArray
  };
}
export function mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken) {
  return (dispatch, getState) => {
    const requestObj = {
      jwtAccessToken,
      deviceId,
      pushToken,
      fname: getState().rider.user.fname,
      lname: getState().rider.user.lname,
      phoneNo: getState().rider.user.phoneNo
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
      .catch(e => console.log("Failed", e));
  };
}
export function fetchAddressFromCoordinatesAsync(region) {
  return (dispatch, getState) =>
    fetch(
      `https:/maps.googleapis.com/maps/api/geocode/json?latlng=${
        region.latitude
      },${region.longitude}&key=${
        getState().basicAppConfig.config.googleMapsApiKey
      }`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(address => {
        dispatch(setCurrentAddress(address));
        dispatch(setPickupAddress(address));
      })
      .catch(e => e);
}
