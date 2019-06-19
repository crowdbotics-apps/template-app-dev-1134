import { changePageStatus } from "../../actions/driver/home";
import { startTrip } from "../../services/driversocket";

export const TRIP_STARTED = "TRIP_STARTED";
export const TRIP_UPDATED = "TRIP_UPDATED";

export function tripStarted(trip) {
  console.log(trip);
  return dispatch => {
    dispatch({ type: TRIP_STARTED, payload: trip });
    dispatch(changePageStatus("dropOff"));
  };
}
export function tripUpdated(status) {
  return {
    type: TRIP_UPDATED,
    payload: status
  };
}
export function startRide() {
  return (dispatch, getState) => {
    startTrip(getState().driver.tripRequest, getState().driver.trip);
  };
}
