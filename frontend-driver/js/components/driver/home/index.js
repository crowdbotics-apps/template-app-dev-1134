import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, TouchableOpacity, BackHandler, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Header, Button, Icon, Title, Left, Right, Body, Switch, Container } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../../actions/drawer';
import { changePageStatus, currentLocationDriver } from '../../../actions/driver/home';
import { updateUserProfileAsync, updateAvailable } from '../../../actions/driver/settings';
import { connectionState } from '../../../actions/network';
import { logOutUserAsync } from '../../../actions/common/signin';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

function mapStateToProps(state) {
	return {
		tripRequest: state.driver.tripRequest,
		fname: state.driver.user.fname,
		jwtAccessToken: state.driver.appState.jwtAccessToken,
		userDetails: state.driver.user,
		isAvailable: state.driver.user.isAvailable,
	};
}
class DriverHome extends Component {
	static propTypes = {
		logOutUserAsync: PropTypes.func,
		jwtAccessToken: PropTypes.string,
		openDrawer: PropTypes.func,
		currentLocationDriver: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this.state = {
			flag: true,
			switchValue: this.props.isAvailable,
		};
	}
	componentWillMount() {
		this.props.closeDrawer();
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
		BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
		BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()); // Remove listener
	}

	_handleConnectionChange = isConnected => {
		this.props.connectionState({ status: isConnected });
	};
	backAndroid() {
		Actions.pop(); // Return to previous screen
		return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
	}
	handleLogOut() {
		this.props.logOutUserAsync(this.props.jwtAccessToken);
	}
	driverAvailable(value) {
		let userData = Object.assign(this.props.userDetails, {
			isAvailable: value,
		});
		this.setState({
			switchValue: value,
		});
		this.props.updateAvailable(userData);
	}

	render() {
		// eslint-disable-line class-methods-use-this
		return (
			<View pointerEvents="box-none">
				<Header
					androidStatusBarColor={commonColor.statusBarColorDark}
					style={styles.iosHeader}
					iosBarStyle="light-content"
				>
					<Left>
						<Button transparent>
							<Icon name="ios-menu" style={styles.logoutLogo} onPress={Actions.drawerOpen} />
						</Button>
					</Left>
					<Body>
						<Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Driver Home
						</Title>
					</Body>
					<Right />
				</Header>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						backgroundColor: 'white',
						padding: 15,
					}}
				>
					<Text style={{ fontWeight: '400', fontSize: 17 }}>Available</Text>
					<Switch value={this.state.switchValue} onValueChange={value => this.driverAvailable(value)} />
				</View>
				<Content />
				<View style={styles.locate}>
					<TouchableOpacity
						style={{ flexDirection: 'row' }}
						onPress={() => this.props.currentLocationDriver()}
					>
						<Icon name="ios-locate" style={{ fontSize: 40, backgroundColor: 'transparent' }} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
function bindActions(dispatch) {
	return {
		closeDrawer: () => dispatch(closeDrawer()),
		openDrawer: () => dispatch(openDrawer()),
		changePageStatus: newPage => dispatch(changePageStatus(newPage)),
		logOutUserAsync: jwtAccessToken => dispatch(logOutUserAsync(jwtAccessToken)),
		currentLocationDriver: () => dispatch(currentLocationDriver()),
		updateAvailable: userDetails => dispatch(updateAvailable(userDetails)),
		connectionState: status => dispatch(connectionState(status)),
	};
}
export default connect(
	mapStateToProps,
	bindActions
)(DriverHome);
