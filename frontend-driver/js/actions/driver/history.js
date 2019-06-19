import config from "../../../config.js";

export const TRIP_HISTORY_FETCHED = "TRIP_HISTORY_FETCHED";
export const SHOW_SPINNER = "SHOW_SPINNER";
export function tripHistoryFetched(dataObj) {
  return {
    type: TRIP_HISTORY_FETCHED,
    payload: dataObj.data
  };
}

export function fetchTripHistoryAsync(jwtAccessToken) {
  return dispatch => {
    dispatch({ type: SHOW_SPINNER });
    fetch(`${config.serverSideUrl}:${config.port}/api/trips/history`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch(tripHistoryFetched(data));
      })
      .catch(e => e);
  };
}
