import { UPDATE_PAYMENT_METHOD } from "../../actions/payment/paymentMethod";
const initialState = {
  ridePayment: false,
  paymentMethod: "CASH",
  loading: false
};
const paymentOption = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAYMENT_METHOD:
      return { ...state, ridePayment: true, paymentMethod: action.payload };
    default:
      return state;
  }
};
export default paymentOption;
