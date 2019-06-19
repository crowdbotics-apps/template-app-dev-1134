import { tripUpdate } from "../../services/ridersocket";

export const CLEAR_REDUCER_STATE = "CLEAR_REDUCER_STATE";
export const SET_RATING = "SET_RATING";
export const SEND_REVIEW = "SEND_REVIEW";

export function clearReducerState() {
	return {
		type: CLEAR_REDUCER_STATE
	};
}
export function setRating(rating) {
	return (dispatch, getState) => {
		dispatch({ type: SET_RATING, payload: rating });
		tripUpdate(getState().rider.trip);
	};
}
export function sendReview(review) {
	return (dispatch, getState) => {
		dispatch({ type: SEND_REVIEW, payload: review });
		tripUpdate(getState().rider.trip);
	};
}
