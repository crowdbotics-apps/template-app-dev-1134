import {tripUpdate} from '../../services/driversocket';

export const CLEAR_REDUCER_STATE = 'CLEAR_REDUCER_STATE';
export const NEW_UPDATE = 'NEW_UPDATE';
export const SET_RATING = 'SET_RATING';

export function clearReducerState() {
  return {
    type: CLEAR_REDUCER_STATE,
  };
}
export function newTripUpdate(trip) {
  return {
    type: NEW_UPDATE,
    payload: trip,
  };
}
export function setRating(rating) {
  return (dispatch, getState) => {
    dispatch({type: SET_RATING, payload: rating});
    tripUpdate(getState().driver.trip);
  };
}
