//
// Action creators to determine signin or signup
//

export const SET_ACTIVE_LOGIN = "SET_ACTIVE_LOGIN";

export function setActiveLogin(page) {
  return {
    type: SET_ACTIVE_LOGIN,
    page: page,
  };
}

export const CLEAR_ENTRY_PAGE = "CLEAR_ENTRY_PAGE";
export function clearEntryPage() {
  return {
    type: CLEAR_ENTRY_PAGE,
  };
}

export const SOCIAL_LOGIN_SUCCESS_AND_ROUTE_TO_REGISTER =
  "SOCIAL_LOGIN_SUCCESS_AND_ROUTE_TO_REGISTER";

export function socailLoginSuccessAndRoutetoRegister(data) {
  return {
    type: SOCIAL_LOGIN_SUCCESS_AND_ROUTE_TO_REGISTER,
    payload: data,
  };
}

export const SOCIAL_SIGNUP_SUCCESS = "SOCIAL_SIGNUP_SUCCESS";

export function socailSignupSuccess(data) {
  return {
    type: SOCIAL_SIGNUP_SUCCESS,
    payload: data,
  };
}
