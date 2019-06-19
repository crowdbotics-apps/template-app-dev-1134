import {
  DRIVER_LOGIN_SUCCESS,
  DRIVER_LOGIN_ERROR,
  REQUEST_LOGIN,
  LOGOUT_USER,
  LOGIN_RESPONSE_RECEIVED,
  CHANGE_LOGIN_ERROR_STATUS
} from "../../actions/common/signin";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESPONSE
} from "../../actions/common/checkUser";
import {
  DRIVER_REGISTER_SUCCESS,
  DRIVER_REGISTER_ERROR,
  REQUEST_REGISTERATION,
  REGISTRATION_RESPONSE_RECEIVED,
  CHANGE_REGISTER_ERROR_STATUS
} from "../../actions/common/register";
import {
  SOCKET_DISCONNECTED,
  CHANGE_PAGE_STATUS,
  TRIP_REQUEST_SYNC_COMPLETED,
  TRIP_SYNC_COMPLETED,
  NOT_IN_ANY_CURRENT_RIDE,
  SET_INITIAL_USER_LOCATION,
  DRIVER_HAS_ARRIVED,
  LOCATION_NOT_FOUND
} from "../../actions/driver/home";
import { CLEAR_REDUCER_STATE } from "../../actions/driver/rateRider";

const initialState = {
  isLoggedIn: false,
  jwtAccessToken: undefined,
  loginError: false,
  registerError: false,
  errormsg: undefined,
  socketDisconnected: false,
  pageStatus: undefined,
  loadSpinner: false,
  initialLocationFetched: false,
  loadingStatus: false
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
    case DRIVER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        jwtAccessToken: action.payload.data.jwtAccessToken
      };
    case DRIVER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        jwtAccessToken: action.payload.data.jwtAccessToken
      };
    case LOGOUT_USER:
      return initialState;

    case SET_INITIAL_USER_LOCATION:
      return { ...state, initialLocationFetched: true };

    case LOCATION_NOT_FOUND:
      return { ...state, initialLocationFetched: true };

    case DRIVER_HAS_ARRIVED:
      return { ...state, pageStatus: "startRide" };

    case TRIP_REQUEST_SYNC_COMPLETED:
      return { ...state, pageStatus: "pickRider" };

    case TRIP_SYNC_COMPLETED:
      return { ...state, pageStatus: "dropOff" };

    case NOT_IN_ANY_CURRENT_RIDE:
      return { ...state, pageStatus: "home" };

    case DRIVER_REGISTER_ERROR:
      return {
        ...state,
        registerError: true,
        errormsg: action.payload.message
      };

    case DRIVER_LOGIN_ERROR:
      return { ...state, loginError: true, errormsg: action.payload.message };

    case CHANGE_LOGIN_ERROR_STATUS:
      return { ...state, loginError: false };
    case CHANGE_REGISTER_ERROR_STATUS:
      return { ...state, registerError: false };

    case CHANGE_PAGE_STATUS:
      return { ...state, pageStatus: action.payload };

    case CLEAR_REDUCER_STATE:
      return { ...state, pageStatus: "home" };

    case SOCKET_DISCONNECTED:
      return { ...state, socketDisconnected: action.payload };

    default:
      return state;
  }
};
export const isInitialLocationFetched = state =>
  state.driver.appState.initialLocationFetched;

export default appState;

export const getErrormsg = state => {
  if (!state.driver.appState.errormsg) {
    return "";
  } else return state.driver.appState.errormsg;
};

export const isFetching = state => state.driver.appState.loadSpinner;
