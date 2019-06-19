import {
	SEND_PAYMENT_DETAILS,
	FETCH_PAYMENT_DETAILS,
	PAYMENT_ERROR,
	FETCH_CARD_DETAILS,
	FETCH_CARD_DETAILS_SUCCESS,
	FETCH_CARD_DETAILS_FAILED,
	REMOVE_CARD,
	REMOVE_CARD_SUCCESS,
	REMOVE_CARD_FAILED,
	ADD_CARD_DETAILS,
	ADD_CARD_SUCCESS,
	ADD_CARD_FAILED,
	UPDATE_CARD,
	UPDATE_CARD_SUCCESS,
	UPDATE_CARD_FAILED
} from "../../actions/payment/riderCardPayment";

const initialState = {
	paymentData: {},
	loadSpinner: false,
	error: {},
	cardDetails: [],
	cardDetailsLoader: false,
	cardDetailsError: {},
	removeCardError: {},
	removeCardLoader: false,
	addCardLoader: false,
	addCardData: {},
	addCardError: {},
	updateCardLoader: false,
	updateCardData: {},
	updateCardError: {}
};
const riderCardPayment = (state = initialState, action) => {
	switch (action.type) {
		case SEND_PAYMENT_DETAILS:
			return { ...state, loadSpinner: true };
		case FETCH_PAYMENT_DETAILS:
			return { ...state, paymentData: action.payload, loadSpinner: false };
		case PAYMENT_ERROR:
			return { ...state, error: action.payload, loadSpinner: false };
		case FETCH_CARD_DETAILS:
			return { ...state, cardDetailsLoader: true };
		case FETCH_CARD_DETAILS_SUCCESS:
			return { ...state, cardDetails: action.payload, cardDetailsLoader: false };
		case FETCH_CARD_DETAILS_FAILED:
			return { ...state, cardDetailsError: action.payload, cardDetailsLoader: false };
		case REMOVE_CARD:
			return { ...state, removeCardLoader: true };
		case REMOVE_CARD_SUCCESS:
			return { ...state, cardDetails: action.payload, removeCardLoader: false };
		case REMOVE_CARD_FAILED:
			return { ...state, removeCardLoader: false, removeCardError: action.payload };
		case ADD_CARD_DETAILS:
			return { ...state, addCardLoader: true };
		case ADD_CARD_SUCCESS:
			return { ...state, addCardData: action.payload, addCardLoader: false };
		case ADD_CARD_FAILED:
			return { ...state, addCardLoader: false, addCardError: action.payload };
		case UPDATE_CARD:
			return { ...state, updateCardLoader: true };
		case UPDATE_CARD_SUCCESS:
			return { ...state, updateCardData: action.payload, updateCardLoader: false };
		case UPDATE_CARD_FAILED:
			return { ...state, updateCardLoader: false, updateCardError: action.payload };
		default:
			return state;
	}
};
export default riderCardPayment;
