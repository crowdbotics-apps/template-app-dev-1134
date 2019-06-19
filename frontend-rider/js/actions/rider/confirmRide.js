import { setCurrentMap } from "../../components/rider/rootView";

export const ADDRESS_FETCHED = "ADDRESS_FETCHED";
export const SET_TRIP_REQUEST = "SET_TRIP_REQUEST";
export const SET_SRC_ADDRESS = "SET_SRC_ADDRESS";
export const SET_SRC_LOC = "SET_SRC_LOC";
export const SET_DEST_ADDRESS = "SET_DEST_ADDRESS";
export const CLEAR_DEST_ADDRESS = "CLEAR_DEST_ADDRESS";
export const SET_DEST_LOC = "SET_DEST_LOC";
export const GET_FARE_ESTIMATION = "GET_FARE_ESTIMATION";
export const CLEAR_FARE_ESTIMATION = "CLEAR_FARE_ESTIMATION";

export function addressFetched(address) {
  return {
    type: ADDRESS_FETCHED,
    payload: address.results[0].formatted_address
  };
}
export function clearFare() {
  return {
    type: CLEAR_FARE_ESTIMATION
  };
}

export function getfare(response, tripAmt) {
  return {
    type: GET_FARE_ESTIMATION,
    payload: response,
    tripAmt
  };
}

export function setTripRequest(status) {
  return {
    type: SET_TRIP_REQUEST,
    payload: status
  };
}
export function setSrcAddress(address) {
  return {
    type: SET_SRC_ADDRESS,
    payload: address
  };
}
export function setDestAddress(address) {
  return {
    type: SET_DEST_ADDRESS,
    payload: address
  };
}
export function clearDestAddress() {
  return {
    type: CLEAR_DEST_ADDRESS,
    payload: ""
  };
}

export function setDestLoc(coordinates) {
  return {
    type: SET_DEST_LOC,
    payload: coordinates
  };
}
export function setSrcLoc(coordinates) {
  return {
    type: SET_SRC_LOC,
    payload: coordinates
  };
}
export function fetchCoordinatesFromAddressAsync(address) {
  return (dispatch, getState) =>
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
        getState().basicAppConfig.config.googleMapsApiKey
      }`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(coordinates => {
        setCurrentMap();
        dispatch(setSrcLoc(coordinates.results[0].geometry.location));
      })
      .catch(e => e);
}
export function fetchCoordinatesFromAddress(address) {
  return (dispatch, getState) =>
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
        getState().basicAppConfig.config.googleMapsApiKey
      }`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(coordinates => {
        setCurrentMap();
        dispatch(setDestLoc(coordinates.results[0].geometry.location));
      })
      .catch(e => e);
}

export function fetchAddressFromCoordinatesAsync(latitude, longitude) {
  return (dispatch, getState) =>
    fetch(
      `https:/maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
        getState().basicAppConfig.config.googleMapsApiKey
      }`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(address => dispatch(addressFetched(address)))
      .catch(e => e);
}

export function fetchFareDetail(tripRequest) {
  return (dispatch, getState) =>
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
        tripRequest.srcLoc[1]
      },${tripRequest.srcLoc[0]}&destinations=${tripRequest.destLoc[1]},${
        tripRequest.destLoc[0]
      }&key=${getState().basicAppConfig.config.googleMapsApiKey}`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(response => {
        const appConfig = getState().basicAppConfig.config;
        const tripDistance = response.rows[0].elements[0].distance.value / 1000;
        const tripTime = response.rows[0].elements[0].duration.value / 60;
        const tripAmt =
          tripDistance * appConfig.tripPrice.farePerKm +
          tripTime * appConfig.tripPrice.farePerMin +
          appConfig.tripPrice.baseFare;
        const status = response.status;
        dispatch(getfare(response, Math.round(tripAmt)));
      })
      .catch(e => e);
}
