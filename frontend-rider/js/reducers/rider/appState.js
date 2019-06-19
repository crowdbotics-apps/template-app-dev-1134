import { REHYDRATE } from 'redux-persist//lib/constants';
import {
	RIDER_LOGIN_SUCCESS,
	RIDER_LOGIN_ERROR,
	LOGOUT_USER,
	REQUEST_LOGIN,
	LOGIN_RESPONSE_RECEIVED,
	CHANGE_LOGIN_ERROR_STATUS,
} from '../../actions/common/signin';
import { USER_LOGIN_REQUEST, USER_LOGIN_RESPONSE } from '../../actions/common/checkUser';
import {
	RIDER_REGISTER_SUCCESS,
	RIDER_REGISTER_ERROR,
	REQUEST_REGISTERATION,
	REGISTRATION_RESPONSE_RECEIVED,
} from '../../actions/common/register';
import {
	SOCKET_DISCONNECTED,
	CHANGE_PAGE_STATUS,
	TRIP_REQUEST_SYNC_COMPLETED,
	TRIP_SYNC_COMPLETED,
	NOT_IN_ANY_CURRENT_RIDE,
	SET_INITIAL_USER_LOCATION,
	LOCATION_NOT_FOUND,
} from '../../actions/rider/home';
import { CLEAR_REDUCER_STATE } from '../../actions/rider/receipt';
import { NO_NEARBY_DRIVER } from '../../actions/rider/rideBooked';

const initialState = {
	isLoggedIn: false,
	jwtAccessToken: undefined,
	loginError: false,
	registerError: false,
	errormsg: undefined,
	socketDisconnected: false,
	pageStatus: 'home',
	loadSpinner: false,
	initialLocationFetched: false,
	loadingStatus: false,
};

const appState = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loadingStatus: true };
		case USER_LOGIN_RESPONSE:
			return { ...state, loadingStatus: false, loadSpinner: false };
		case REQUEST_LOGIN:
			return { ...state, loadSpinner: true };
		case LOGIN_RESPONSE_RECEIVED:
			return { ...state, loadSpinner: false, loadingStatus: false };
		case REQUEST_REGISTERATION:
			return { ...state, loadSpinner: true };

		case REGISTRATION_RESPONSE_RECEIVED:
			return { ...state, loadSpinner: false, loadingStatus: false };

		case RIDER_LOGIN_SUCCESS:
			//console.error(action.payload.data.jwtAccessToken)
			return {
				...state,
				isLoggedIn: true,
				loginError: false,
				jwtAccessToken: action.payload.data.jwtAccessToken,
			};
		case RIDER_REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				jwtAccessToken: action.payload.data.jwtAccessToken,
			};

		case RIDER_LOGIN_ERROR:
			return { ...state, loginError: true, errormsg: action.payload.message };
		case CHANGE_LOGIN_ERROR_STATUS:
			return { ...state, loginError: false };
		case RIDER_REGISTER_ERROR:
			return {
				...state,
				registerError: true,
				errormsg: action.payload.message,
			};

		case LOGOUT_USER:
			return initialState;

		case SET_INITIAL_USER_LOCATION:
			return { ...state, initialLocationFetched: true, loadSpinner: false };

		case LOCATION_NOT_FOUND:
			return { ...state, initialLocationFetched: true, loadSpinner: false };

		case NO_NEARBY_DRIVER:
			return { ...state, pageStatus: action.payload };

		case TRIP_REQUEST_SYNC_COMPLETED:
			return { ...state, pageStatus: 'rideBooked' };

		case TRIP_SYNC_COMPLETED:
			return { ...state, pageStatus: 'rideBooked' };

		case NOT_IN_ANY_CURRENT_RIDE:
			return { ...state, pageStatus: 'home' };

		case CHANGE_PAGE_STATUS:
			return { ...state, pageStatus: action.payload };

		case CLEAR_REDUCER_STATE:
			return { ...state, pageStatus: undefined };

		case SOCKET_DISCONNECTED:
			return { ...state, socketDisconnected: action.payload };
		// case REHYDRATE:
		// 	if (Object.keys(action.payload).length !== 0) {
		// 		action.payload.rider.appState.pageStatus =
		// 			action.payload.rider.appState.pageStatus === 'confirmRide'
		// 				? 'home'
		// 				: action.payload.rider.appState.pageStatus;
		// 		return action.payload.rider.appState;
		// 	} else {
		// 		return state;
		// 	}
		default:
			return state;
	}
};
export default appState;

export const getErrormsg = state => {
	if (!state.rider.appState.errormsg) {
		return '';
	} else {
		return state.rider.appState.errormsg;
	}
};
function createRiderMarker(gpsLoc) {
	if (!(gpsLoc[1] || gpsLoc[0])) {
		return null;
	}
	return {
		latitude: gpsLoc[1],
		longitude: gpsLoc[0],
	};
}
function createDriverMarker(gpsLoc) {
	if (!(gpsLoc[1] || gpsLoc[0])) {
		return null;
	}
	return {
		latitude: gpsLoc[1],
		longitude: gpsLoc[0],
	};
}
export const getMarkers = state => {
	const ridermarker = createRiderMarker(state.rider.user.gpsLoc);
	let markers = [];
	if (!ridermarker) {
		markers = [];
	} else {
		markers = [ridermarker];
	}
	return markers;
};
export const isInitialLocationFetched = state => state.rider.appState.initialLocationFetched;

export const isFetching = state => state.rider.appState.loadSpinner;
