import { createStore, applyMiddleware, compose } from 'redux';
// import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers';

const blacklistFilter = createBlacklistFilter('driver', [
	'tripRequest',
	'trip',
	'rideCardPayment',
	'paymentOption',
	'appState.loadingStatus',
]);

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ['socialLogin', 'entrypage', 'form', 'route', 'trip', 'viewStore', 'rideCardPayment'],
	// transforms: [blacklistFilter],
	timeout: null,
};
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const persistedReducer = persistReducer(persistConfig, reducer);
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
