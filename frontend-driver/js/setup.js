import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleProvider, Spinner } from 'native-base';
import Permissions from 'react-native-permissions';
import App from './App';
import { store, persistor } from './configureStore';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/commonColor';

export const storeObj = {};

export default class Setup extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			isReady: false,
			notification: {},
		};
		storeObj.store = store;
	}
	componentDidMount() {
		Permissions.check('location', { type: 'always' }).then(response => {
			this.setState({ locationPermission: response });
			console.log('here in location 1', response);
		});
		Permissions.request('location', { type: 'always' }).then(response => {
			this.setState({ locationPermission: response });
			console.log('here in location 2', response);
		});
	}
	render() {
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</StyleProvider>
		);
	}
}
