//
// Reducers related to the entry page logic
//
import {
  SET_ACTIVE_LOGIN,
  CLEAR_ENTRY_PAGE,
  SOCIAL_LOGIN_SUCCESS_AND_ROUTE_TO_REGISTER,
  SOCIAL_SIGNUP_SUCCESS
} from "../actions/common/entrypage";

const socialLoginIS = {
  fname: null,
  lname: null,
  email: null,
  id: null
};

const initialState = {
  active: null,
  socialLogin: socialLoginIS
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LOGIN:
      return { ...state, active: action.page };
    case CLEAR_ENTRY_PAGE:
      return { ...state, ...initialState };
    case SOCIAL_LOGIN_SUCCESS_AND_ROUTE_TO_REGISTER:
      return {
        ...state,
        active: "register",
        socialLogin: {
          ...socialLoginIS,
          email: action.payload.email,
          fname: action.payload.first_name || action.payload.givenName,
          lname: action.payload.last_name || action.payload.familyName
        }
      };
    case SOCIAL_SIGNUP_SUCCESS:
      return {
        ...state,
        active: "register",
        socialLogin: {
          ...socialLoginIS,
          email: action.payload.email,
          fname: action.payload.first_name || action.payload.givenName,
          lname: action.payload.last_name || action.payload.familyName,
          id: action.payload.id || action.payload.userID
        }
      };
    default:
      return state;
  }
}
