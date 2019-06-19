import { Actions, ActionConst } from "react-native-router-flux";
import config from "../../../config.js";
import { updatePayment } from "./paymentMethod";
import axios from 'axios'

export const SEND_PAYMENT_DETAILS = "DETAILS_SENDED";
export const FETCH_PAYMENT_DETAILS = "PAYMENT_RESPONSE_RECIEVED";
export const PAYMENT_ERROR = "PAYMENT_ERROR";
export const FETCH_CARD_DETAILS = "FETCH_CARD_DETAILS";
export const FETCH_CARD_DETAILS_SUCCESS = "FETCH_CARD_DETAILS_SUCCESS";
export const FETCH_CARD_DETAILS_FAILED = "FETCH_CARD_DETAILS_FAILED";
export const REMOVE_CARD = "REMOVE_CARD";
export const REMOVE_CARD_SUCCESS = "REMOVE_CARD_SUCCESS";
export const REMOVE_CARD_FAILED = "REMOVE_CARD_FAILED";
export const ADD_CARD_DETAILS = "ADD_CARD_DETAILS";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAILED = "ADD_CARD_FAILED";
export const UPDATE_CARD = "UPDATE_CARD";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILED = "UPDATE_CARD_FAILED";

export function sendPaymentDetails() {
	return {
		type: SEND_PAYMENT_DETAILS
	};
}
export function paymentSuccess(data) {
	return {
		type: FETCH_PAYMENT_DETAILS,
		payload: data
	};
}
export function paymentFailed(error) {
	return {
		type: PAYMENT_ERROR,
		payload: error
	};
}
export function fetchingCardDetails() {
	return {
		type: FETCH_CARD_DETAILS
	};
}
export function cardDetailsSuccess(data) {
	return {
		type: FETCH_CARD_DETAILS_SUCCESS,
		payload: data
	};
}
export function cardDetailsFailed(error) {
	return {
		type: FETCH_CARD_DETAILS_FAILED,
		payload: error
	};
}
export function removingCard() {
	return {
		type: REMOVE_CARD
	};
}
export function removeCardSuccess(data) {
	return {
		type: REMOVE_CARD_SUCCESS,
		payload: data
	};
}
export function removeCardFailed(error) {
	return {
		type: REMOVE_CARD_FAILED,
		payload: error
	};
}
export function addCardDetails() {
	return {
		type: ADD_CARD_DETAILS
	};
}
export function addCardSuccess(data) {
	return {
		type: ADD_CARD_SUCCESS,
		payload: data
	};
}
export function addCardFailed(error) {
	return {
		type: ADD_CARD_FAILED,
		payload: error
	};
}
export function updateCard() {
	return {
		type: UPDATE_CARD
	};
}
export function updateCardSuccess(data) {
	return {
		type: UPDATE_CARD_SUCCESS,
		payload: data
	};
}
export function updateCardFailed() {
	return {
		type: UPDATE_CARD_FAILED
	};
}
export function removeCard(cardDetails) {
	return (dispatch, getState) => {
		dispatch(removingCard());
		fetch(`${config.serverSideUrl}:${config.port}/api/payment/removeCard`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: ''//getState().rider.appState.jwtAccessToken
			},
			body: JSON.stringify(cardDetails)
		})
			.then(resp => resp.json())
			.then(respObj => {
				dispatch(removeCardSuccess(respObj));
			})
			.catch(e => {
				dispatch(removeCardFailed(e));
			});
	};
}
export function addCard(paymentDetails, additionalData) {
	return (dispatch, getState) => {

		dispatch(addCardDetails());
		fetch(`${config.serverSideUrl}:${config.port}/api/payment/addCard`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: ''//,getState().rider.appState.jwtAccessToken
			},
			body: JSON.stringify(paymentDetails)
		})
			.then(async resp => {
				
				
				return resp.json() 
			})
			.then(data => {
				//console.error(data)
				dispatch(addCardSuccess(data));
				dispatch(updatePayment("CARD"));
			})
			.catch(e => {
				//console.error(e)
				dispatch(addCardFailed(e));
			});
	};
}
export function saveCardDetails(paymentDetails) { //DDT
	return (dispatch, getState) => {
		//dispatch(fetchingCardDetails());
		

		fetch(`${config.serverSideUrl}:${config.port}/api/payment/checkSaveCard`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: '',// getState().rider.appState.jwtAccessToken
			},
			body: JSON.stringify(paymentDetails)
		})
			.then(resp => resp.json())
			.then(data => {
				//console.error(data)
				dispatch(cardDetailsSuccess(data));
				
				if (data.message === "Card Exist") {
					Actions.saveCards({ type: ActionConst.REPLACE });
				} else {
					//console.error('creditCardq')
					Actions.creditCardq({ type: ActionConst.REPLACE });
				}
			})
			.catch(e => {
				//console.error(e)
				dispatch(cardDetailsFailed(e));
			});
	};
}

export function updateCardDetails(cardDetails) {
	return (dispatch, getState) => {
		dispatch(updateCard());
		fetch(`${config.serverSideUrl}:${config.port}/api/payment/updateCard`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: '',//getState().rider.appState.jwtAccessToken
			},
			body: JSON.stringify(cardDetails)
		})
			.then(resp => resp.json())
			.then(respObj => {
				dispatch(updateCardSuccess(respObj));
				const obj = {
					amount: 1000
				};
				dispatch(updatePayment("CARD"));
				// Actions.paymentConfirm({type: ActionConst.REPLACE , data: obj });
			})
			.catch(e => {
				dispatch(updateCardFailed(e));
			});
	};
}

export function payment(cardDetails) {
	return (dispatch, getState) => {
		dispatch(sendPaymentDetails());
		fetch(`${config.serverSideUrl}:${config.port}/api/payment/cardPayment`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: '',//getState().rider.appState.jwtAccessToken
			},
			body: JSON.stringify(cardDetails)
		})
			.then(resp => resp.json())
			.then(respObj => {
				dispatch(paymentSuccess(respObj));
				Actions.paymentDetails({ type: ActionConst.REPLACE });
			})
			.catch(e => {
				dispatch(paymentFailed(e));
				Actions.paymentDetails({ type: ActionConst.REPLACE });
			});
	};
}
