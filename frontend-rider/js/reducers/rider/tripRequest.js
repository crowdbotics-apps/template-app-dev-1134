import { REHYDRATE } from 'redux-persist//lib/constants';
import {
	ADDRESS_FETCHED,
	SET_TRIP_REQUEST,
	SET_SRC_ADDRESS,
	SET_SRC_LOC,
	SET_DEST_LOC,
	SET_DEST_ADDRESS,
	CLEAR_DEST_ADDRESS,
	GET_FARE_ESTIMATION,
	CLEAR_FARE_ESTIMATION,
} from '../../actions/rider/confirmRide';
import {
	TRIP_REQUEST_UPDATED,
	NO_NEARBY_DRIVER,
	CANCEL_RIDE,
	DRIVER_LOCATION_UPDATED,
} from '../../actions/rider/rideBooked';
import { CLEAR_REDUCER_STATE } from '../../actions/rider/receipt';
import {
	CLEAR_TRIP_AND_TRIPREQUEST,
	SET_PICKUP_ADDRESS,
	CHANGE_REGION,
	SET_SRC_LOCC,
	TRIP_REQUEST_SYNC_COMPLETED,
	NOT_IN_ANY_CURRENT_RIDE,
} from '../../actions/rider/home';

const initialState = {
	riderId: undefined,
	driverId: undefined,
	tripId: undefined,
	latitudeDelta: undefined,
	tripTime: undefined,
	tripAmt: undefined,
	tripDistance: undefined,
	longitudeDelta: undefined,
	pickUpAddress: undefined,
	srcLoc: [],
	destLoc: [],
	destAddress: '',
	tripRequestStatus: undefined,
	tripIssue: undefined,
};

const tripRequest = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_TRIP_AND_TRIPREQUEST:
			return initialState;
		case CHANGE_REGION:
			return {
				...state,
				srcLoc: [action.payload.longitude, action.payload.latitude],
				latitudeDelta: action.payload.latitudeDelta,
				longitudeDelta: action.payload.longitudeDelta,
			};

		case SET_SRC_LOC:
			return {
				...state,
				srcLoc: [action.payload.lng, action.payload.lat],
			};
		case SET_SRC_LOCC:
			return {
				...state,
				srcLoc: [action.payload.longitude, action.payload.latitude],
			};
		case GET_FARE_ESTIMATION:
			return {
				...state,
				tripAmt: action.tripAmt,
				tripDistance: action.payload.rows[0].elements[0].distance.text,
				tripTime: action.payload.rows[0].elements[0].duration.text,
			};
		case CLEAR_FARE_ESTIMATION:
			return {
				...state,
				tripTime: null,
				tripAmt: null,
				tripDistance: null,
			};

		case SET_DEST_LOC:
			return {
				...state,
				destLoc: [action.payload.lng, action.payload.lat],
			};

		case TRIP_REQUEST_SYNC_COMPLETED:
			return action.payload;

		case NOT_IN_ANY_CURRENT_RIDE:
			return { ...initialState, srcLoc: action.payload };
		case SET_SRC_ADDRESS:
			return { ...state, pickUpAddress: action.payload };
		case SET_PICKUP_ADDRESS:
			return { ...state, pickUpAddress: action.payload };
		case SET_DEST_ADDRESS:
			return { ...state, destAddress: action.payload };
		case CLEAR_DEST_ADDRESS:
			return {
				...state,
				destAddress: action.payload,
				pickUpAddress: undefined,
			};
		case SET_TRIP_REQUEST:
			return { ...state, tripRequestStatus: action.payload };

		case ADDRESS_FETCHED:
			return { ...state, pickUpAddress: action.payload };

		case TRIP_REQUEST_UPDATED:
			return action.payload;

		case NO_NEARBY_DRIVER:
			return { ...state, tripRequestStatus: undefined };

		case DRIVER_LOCATION_UPDATED:
			return { ...state, driver: { ...state.rider, gpsLoc: action.payload } };

		case CANCEL_RIDE:
			return { ...state, tripRequestStatus: 'cancelled' };

		case CLEAR_REDUCER_STATE:
			return initialState;
		// case REHYDRATE:
		// 	return state;
		default:
			return state;
	}
};

export const tripView = state => {
	const { tripRequestStatus } = state.rider.tripRequest;
	const { tripStatus } = state.rider.trip;

	if (!tripRequestStatus) {
		return {
			loadSpinner: false,
		};
	}
	if (tripRequestStatus === 'request') {
		return {
			loadSpinner: true,
		};
	}
	if (tripRequestStatus === 'enRoute') {
		return {
			heading: 'En Route',
			subText: 'DRIVER CONFIRMED AND ENROUTE',
			showFooter: true,
			loadSpinner: false,
			backButton: false,
			cancelButton: true,
		};
	} else if (tripRequestStatus === 'arriving') {
		return {
			heading: 'Arriving',
			subText: 'DRIVER IS ARRIVING SHORTLY',
			showFooter: true,
			loadSpinner: false,
			backButton: false,
			cancelButton: true,
		};
	} else if (tripRequest === 'arrived') {
		return {
			heading: 'Arrived',
			subText: 'DRIVER HAS REACHED YOUR LOCATION.',
			showFooter: true,
			loadSpinner: false,
			backButton: false,
			cancelButton: true,
		};
	} else if (tripRequestStatus === 'cancelled') {
		return {
			heading: 'Cancelled',
			subText: 'YOUR RIDE HAS BEEN CANCELLED',
			showFooter: false,
			loadSpinner: false,
			backButton: true,
			cancelButton: false,
		};
	} else if (tripStatus === 'onTrip') {
		return {
			heading: 'On Trip',
			subText: 'YOU ARE ON TRIP',
			showFooter: false,
			loadSpinner: false,
			backButton: false,
			cancelButton: false,
		};
	} else if (tripStatus === 'endTrip') {
		return {
			heading: 'Destination Arrived',
			subText: 'YOU HAVE ARRIVED AT YOUR DESTINATION',
			showFooter: false,
			loadSpinner: false,
			backButton: false,
			cancelButton: false,
		};
	}
	return {
		heading: 'Arrived',
		subText: 'Driver is waiting at your pickup location.',
		showFooter: true,
		loadSpinner: false,
		backButton: false,
		cancelButton: true,
	};
};
export default tripRequest;
