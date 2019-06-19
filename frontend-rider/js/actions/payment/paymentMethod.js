import { Actions } from "react-native-router-flux";

export const UPDATE_PAYMENT_METHOD = "UPDATE_PAYMENT";

export function updatePayment(paymentType) {
	return dispatch => {
		dispatch({ type: UPDATE_PAYMENT_METHOD, payload: paymentType });
		Actions.pop();
	};
}
