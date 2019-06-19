import {changePageStatus} from '../../actions/driver/home';
import {tripRequestUpdate} from '../../services/driversocket';

export const TRIP_REQUEST_UPDATED = 'TRIP_REQUEST_UPDATED';
export const CANCELLED_RIDE_BY_RIDER = 'CANCELLED_RIDE_BY_RIDER';
export const CANCELLED_RIDE_BY_DRIVER = 'CANCELLED_RIDE_BY_DRIVER';
export const REDUCE_DISTANCE = 'REDUCE_DISTANCE';
export const RESET_DISTANCE = 'RESET_DISTANCE';

export function tripRequestUpdated(tripRequest) {
  return dispatch => {
    switch (tripRequest.tripRequestStatus) {
      case 'cancelled':
        alert('Your ride has been cancelled');
        dispatch({type: CANCELLED_RIDE_BY_RIDER, payload: tripRequest});
        dispatch(changePageStatus('driverHome'));
        break;
      case 'enRoute': // may happen only if later backend sets enRoute. Right now driver is setting tripRequestStatus enRoute. This case will not happen
        dispatch({type: TRIP_REQUEST_UPDATED, payload: tripRequest});
        dispatch(changePageStatus('pickRider'));
        break;
      case 'arrived':
        dispatch({type: TRIP_REQUEST_UPDATED, payload: tripRequest});
        dispatch(changePageStatus('startRide'));
        break;
      default:
        dispatch({type: TRIP_REQUEST_UPDATED, payload: tripRequest});
    }
  };
}
export function cancelledRideByDriver() {
  return (dispatch, getState) => {
    dispatch({type: CANCELLED_RIDE_BY_DRIVER, payload: 'cancelled'});
    tripRequestUpdate(getState().driver.tripRequest);
    alert('Your ride has been cancelled');
    dispatch(changePageStatus('driverHome'));
  };
}
