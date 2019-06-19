import { REHYDRATE } from 'redux-persist//lib/constants';
import {Dimensions} from 'react-native';
import { RIDER_LOGIN_SUCCESS, LOGOUT_USER } from '../../actions/common/signin';
import { RIDER_REGISTER_SUCCESS } from '../../actions/common/register';
import {
	SET_USER_LOCATION,
	NEARBY_DRIVERS_LIST,
	SET_DEVICE_ID_AND_PUSH_TOKEN,
	SET_INITIAL_USER_LOCATION,
	SET_CURRENT_ADDRESS,
} from '../../actions/rider/home';
import { SET_SRC_LOC } from '../../actions/rider/confirmRide';
import { PROFILE_UPDATED, SET_HOME_ADDRESS, SET_WORK_ADDRESS, PROFILE_PROGRESS } from '../../actions/rider/settings';

const initialState = {
	_id: undefined,
	email: undefined,
	password: undefined,
	userType: undefined,
	fname: undefined,
	lname: undefined,
	dob: undefined,
	deviceId: undefined,
	pushToken: undefined,
	address: undefined,
	city: undefined,
	state: undefined,
	country: undefined,
	emergencyDetails: {
		phone: undefined,
		name: undefined,
		imgUrl: undefined,
	},
	recoveryEmail: undefined,
	latitudeDelta: undefined,
	longitudeDelta: undefined,
	gpsLoc: [],
	userRating: undefined,
	phoneNo: undefined,
	profileUrl: undefined,
	currTripId: undefined,
	currTripState: undefined,
	loginStatus: undefined,
	createdAt: undefined,
	homeAddress: undefined,
	profileUpdating: false,
	workAddress: undefined,
	driversList: [],
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case RIDER_LOGIN_SUCCESS:
			return action.payload.data.user;

		case RIDER_REGISTER_SUCCESS:
			return action.payload.data.user;

		case LOGOUT_USER:
			return initialState;

		case SET_CURRENT_ADDRESS:
			return { ...state, address: action.payload };

		case SET_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
			};

		case SET_INITIAL_USER_LOCATION:
			return {
				...state,
				gpsLoc: [action.payload.longitude, action.payload.latitude],
			};
		case PROFILE_PROGRESS:
			return { ...state, profileUpdating: true };
		case NEARBY_DRIVERS_LIST:
			return { ...state, driversList: action.payload };

		case SET_DEVICE_ID_AND_PUSH_TOKEN:
			return {
				...state,
				deviceId: action.deviceId,
				pushToken: action.pushToken,
			};

		case PROFILE_UPDATED:
			return {
				...state,
				fname: action.payload.data && action.payload.data.fname,
				lname: action.payload.data && action.payload.data.lname,
				email: action.payload.data && action.payload.data.email,
				phoneNo: action.payload.data && action.payload.data.phoneNo,
				profileUrl: action.payload.data && action.payload.data.profileUrl,
				workAddress: action.payload.data && action.payload.data.workAddress,
				homeAddress: action.payload.data && action.payload.data.homeAddress,
				emergencyDetails: action.payload.data && action.payload.data.emergencyDetails,
				profileUpdating: false,
			};

		case SET_HOME_ADDRESS:
			return { ...state, homeAddress: action.payload };
		case SET_WORK_ADDRESS:
			return { ...state, workAddress: action.payload };
		// case REHYDRATE:
		// 	if (Object.keys(action.payload).length !== 0) {
		// 		return action.payload.rider.user;
		// 	} else {
		// 		return state;
		// 	}
		default:
			return state;
	}
};

export const getUserType = state => {
	const rider = state.rider.user.userType;
	if (!rider) {
		return null;
	} else {
		return rider;
	}
};
export const getNearbyDriversLocation = state => {
	const { width, height } = Dimensions.get('window');
    const aspectRatio = width / height;
	const driversList = state.rider.user.driversList;
	
	if (!driversList) {
		return undefined;
	}
	const array = [];
	driversList.forEach(driver => {
		const location = driver.gpsLoc;
		const coordinates = {
			latitude: location[1],
			longitude: location[0],
			latitudeDelta: driver.latitudeDelta,
			longituteDelta:driver.latitudeDelta * aspectRatio
		};
		array.push(coordinates);
	});
	return array;
};
export default user;
