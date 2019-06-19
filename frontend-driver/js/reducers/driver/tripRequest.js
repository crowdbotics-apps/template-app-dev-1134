import {
  NEW_RIDE_REQUEST,
  TRIP_REQUEST_SYNC_COMPLETED,
  NOT_IN_ANY_CURRENT_RIDE,
} from '../../actions/driver/home';
import {
  RESPONSE_BY_DRIVER,
  RESPONSE_TIMED_OUT,
} from '../../actions/driver/rideRequest';
import {
  REQUEST_TRIP_UPDATED,
  CANCELLED_RIDE_BY_RIDER,
  TRIP_REQUEST_UPDATED,
  CANCELLED_RIDE_BY_DRIVER,
} from '../../actions/driver/pickRider';
import {CLEAR_REDUCER_STATE} from '../../actions/driver/rateRider';

const initialState = {
  riderId: undefined,
  driverId: undefined,
  tripId: undefined,
  latitudeDelta: 0.022,
  longitudeDelta: 0.013,
  pickUpAddress: 'some xyz addresss',
  srcLoc: [],
  destLoc: [],
  destAddress: undefined,
  tripRequestStatus: undefined,
  tripIssue: undefined,
};

const tripRequest = (state = initialState, action) => {
  switch (action.type) {
    case TRIP_REQUEST_SYNC_COMPLETED:
      return action.payload;

    case NOT_IN_ANY_CURRENT_RIDE:
      return {...initialState, srcLoc: action.payload};

    case NEW_RIDE_REQUEST:
      return action.payload;

    case RESPONSE_BY_DRIVER:
      return {...state, tripRequestStatus: action.payload};

    case RESPONSE_TIMED_OUT:
      return initialState;

    case CANCELLED_RIDE_BY_RIDER:
      return action.payload;

    case REQUEST_TRIP_UPDATED:
      return {...state, tripRequestStatus: action.payload};

    case TRIP_REQUEST_UPDATED:
      return action.payload;

    case CANCELLED_RIDE_BY_DRIVER:
      return {...state, tripRequestStatus: action.payload};

    case CLEAR_REDUCER_STATE:
      return initialState;

    default:
      return state;
  }
};
export default tripRequest;

export const tripView = state => {
  const {tripRequestStatus} = state.driver.tripRequest;
  if (tripRequestStatus === 'enRoute') {
    return {
      heading: 'EN ROUTE',
      cancelButton: true,
      backButton: false,
    };
  } else if (tripRequestStatus === 'arriving') {
    return {
      heading: 'ARRIVING',
      cancelButton: true,
      backButton: false,
    };
  } else if (tripRequestStatus === 'arrived') {
    return {
      heading: 'ARRIVED',
      cancelButton: false,
      backButton: false,
    };
  } else if (tripRequestStatus === 'cancelled') {
    return {
      heading: 'CANCELLED',
      cancelButton: false,
      backButton: true,
    };
  }
  return {
    heading: 'ARRIVED',
    subtext: 'YOU HAVE ARRIVED AT PICKUP LOCATION',
    cancelButton: true,
    backButton: true,
  };
};
