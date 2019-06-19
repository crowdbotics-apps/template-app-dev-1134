import { FETCH_APP_CONFIG, FETCH_APP_CONFIG_ERROR, FETCH_APP_CONFIG_SUCCESS, UPDATE_APP_CONFIG } from '../actions/appConfig';
const initialState = {
  config: {},
  error: {},
  loader: false
};
const basicAppConfig = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_APP_CONFIG:
        return { ...state, loader: true };
      case FETCH_APP_CONFIG_ERROR:
        return { ...state, loader: false, error: action.payload };
      case UPDATE_APP_CONFIG:
        return { ...state, loader: false, config: action.payload };
      case FETCH_APP_CONFIG_SUCCESS:
        return { ...state, loader: false };
    default:
      return state;
  }
};
export default basicAppConfig;
