import { combineReducers } from "redux";
import appState from "./appState";
import user from "./user";
import tripRequest from "./tripRequest";
import trip from "./trip";
import history from "./history";
import paymentOption from "./paymentOption";

import rideCardPayment from "./rideCardPayment";

const rider = combineReducers({
	appState,
	user,
	trip,
	tripRequest,
	history,
	rideCardPayment,
	paymentOption
});
export default rider;
