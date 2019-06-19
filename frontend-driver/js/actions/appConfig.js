import config from '../../config.js';

export const FETCH_APP_CONFIG = 'FETCH_APP_CONFIG';
export const FETCH_APP_CONFIG_ERROR = 'FETCH_APP_CONFIG_ERROR';
export const FETCH_APP_CONFIG_SUCCESS = 'FETCH_APP_CONFIG_SUCCESS';
export const UPDATE_APP_CONFIG = 'UPDATE_APP_CONFIG';

export function fetchingAppConfig() {
  return {
    type: FETCH_APP_CONFIG
  };
}
export function appConfigError() {
  return {
    type: FETCH_APP_CONFIG_ERROR
  };
}
export function appConfigSuccess(e) {
  return {
    type: FETCH_APP_CONFIG_SUCCESS,
    payload: e
  };
}
export function updateAppConfig(data) {
  return {
    type: UPDATE_APP_CONFIG,
    payload: data
  };
}

export function getAppConfig() {
  return (dispatch, getState) => {
    let appVersion = 0;
    if (Object.keys(getState().basicAppConfig.config).length !== 0) {
      appVersion = getState().basicAppConfig.config.version;
    }
    dispatch(fetchingAppConfig());
    fetch(`${config.serverSideUrl}:${config.port}/api/config/appConfig`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (appVersion !== data.version || Object.keys(data).length === 0) {
          dispatch(updateAppConfig(data));
        }
        dispatch(appConfigSuccess());
      })
      .catch(e => {
        dispatch(appConfigError(e));
      });
  };
}
