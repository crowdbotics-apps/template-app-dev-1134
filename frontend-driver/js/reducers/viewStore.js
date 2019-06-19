import {PREDICTION_RESPONSE_RECEIVED} from '../actions/driver/home';

const initialState = {
  predictionArray: [],
};

const viewStore = (state = initialState, action) => {
  switch (action.type) {
    case PREDICTION_RESPONSE_RECEIVED:
      return {...state, predictionArray: action.payload};
    default:
      return state;
  }
};
export const pickupButtonVisibility = state =>
  (state.viewStore.predictionArray.length === 0 ? true : false);

export default viewStore;
