import { TRIP_STARTED, TRIP_UPDATED } from "../../actions/driver/startRide";
import {
  CLEAR_REDUCER_STATE,
  NEW_UPDATE,
  SET_RATING
} from "../../actions/driver/rateRider";
import { END_TRIP, TRIP_FARE } from "../../actions/driver/dropOff";
import {
  TRIP_SYNC_COMPLETED,
  NOT_IN_ANY_CURRENT_RIDE
} from "../../actions/driver/home";

const initialState = {
  _id: undefined,
  riderId: undefined,
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
    case TRIP_STARTED:
      return action.payload;

    case TRIP_SYNC_COMPLETED:
      return action.payload;

    case NOT_IN_ANY_CURRENT_RIDE:
      return initialState;

    case TRIP_UPDATED:
      return { ...state, tripStatus: action.payload };

    case NEW_UPDATE:
      return action.payload;

    case END_TRIP:
      return { ...state, tripStatus: action.payload };
    case TRIP_FARE:
      return { ...state, tripAmt: action.payload };
    case SET_RATING:
      return { ...state, riderRatingByDriver: action.payload };

    case CLEAR_REDUCER_STATE:
      return initialState;

    default:
      return state;
  }
};
export default trip;

export const tripSelector = state => {
  const { tripStatus } = state.driver.trip;
  if (tripStatus === "onTrip") {
    return {
      heading: "ON TRIP",
      backButton: false
    };
  }
  return {
    heading: "TRIP COMPLETED",
    backButton: true
  };
};
