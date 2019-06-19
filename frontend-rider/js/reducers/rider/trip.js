import { TRIP_UPDATED } from "../../actions/rider/rideBooked";
import {
  CLEAR_REDUCER_STATE,
  SET_RATING,
  SEND_REVIEW
} from "../../actions/rider/receipt";
import {
  CLEAR_TRIP_AND_TRIPREQUEST,
  TRIP_SYNC_COMPLETED,
  NOT_IN_ANY_CURRENT_RIDE
} from "../../actions/rider/home";

const initialState = {
  _id: undefined,
  userId: undefined,
  driverId: undefined,
  pickUpAddress: undefined,
  destAddress: undefined,
  latitudeDelta: undefined,
  longitudeDelta: undefined,
  srcLoc: [],
  destLoc: [],
  paymentMode: undefined,
  tripAmt: undefined,
  bookingTime: undefined,
  travelTime: undefined,
  taxiType: undefined,
  riderRatingByDriver: undefined,
  driverRatingByRider: undefined,
  seatBooked: undefined,
  tripStatus: undefined,
  tripIssue: undefined,
  roadMapUrl: undefined
};

const trip = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TRIP_AND_TRIPREQUEST:
      return initialState;

    case TRIP_SYNC_COMPLETED:
      return action.payload;

    case NOT_IN_ANY_CURRENT_RIDE:
      return initialState;

    case TRIP_UPDATED:
      return action.payload;

    case SET_RATING:
      return { ...state, driverRatingByRider: action.payload };

    case SEND_REVIEW:
      return { ...state, driverReviewByRider: action.payload };

    case CLEAR_REDUCER_STATE:
      return initialState;

    default:
      return state;
  }
};

export default trip;
