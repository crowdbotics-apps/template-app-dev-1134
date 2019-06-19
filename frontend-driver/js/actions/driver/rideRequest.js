import {requestDriverResponse} from '../../services/driversocket';
import {changePageStatus} from '../../actions/driver/home';

export const RESPONSE_BY_DRIVER = 'RESPONSE_BY_DRIVER';
export const REQUEST_TRIP_UPDATED = 'REQUEST_TRIP_UPDATED';
export const RESPONSE_TIMED_OUT = 'RESPONSE_TIMED_OUT';
export function responseByDriver(response) {
  if (response === 'accept') {
    return (dispatch, getState) => {
      dispatch({type: RESPONSE_BY_DRIVER, payload: 'enRoute'});
      dispatch(changePageStatus('pickRider'));
      requestDriverResponse(getState().driver.tripRequest); // socket call
    };
  }
  return (dispatch, getState) => {
    dispatch({type: RESPONSE_BY_DRIVER, payload: 'rejected'});
    requestDriverResponse(getState().driver.tripRequest); // socket call
    dispatch(changePageStatus('driverHome'));
  };
}
export function responseTimedOut() {
  // clear trip Request object,
  return dispatch => {
    dispatch({type: RESPONSE_TIMED_OUT});
    dispatch(changePageStatus('driverHome'));
  };
}
