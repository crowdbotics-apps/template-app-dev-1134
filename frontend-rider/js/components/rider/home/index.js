import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Header, Text, Button, Icon, Title, Item, Left, Right, Body, Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import { openDrawer, closeDrawer } from '../../../actions/drawer';
import {
	changeRegion,
	changePageStatus,
	fetchUserCurrentLocationAsync,
	fetchAddressFromCoordinatesAsync,
	currentLocation,
	setPickupAddress
} from '../../../actions/rider/home';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import config from '../../../../config.js';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
function mapStateToProps(state) {
	return {
		region: {
			longitude: state.rider.user.gpsLoc[0],
			latitude: state.rider.user.gpsLoc[1],
			latitudeDelta: state.rider.user.latitudeDelta,
			longitudeDelta: state.rider.user.latitudeDelta * aspectRatio,
		},
		isConnected: state.network.isConnected,
		pickUpAddress: state.rider.tripRequest.pickUpAddress,
		currentAddress: state.rider.user.address,
		destAddress: state.rider.tripRequest.destAddress,
		mapRegion: state.rider.tripRequest.srcLoc,
		drawerState: state.drawer.drawerState,
	};
}
class Home extends Component {
	static propTypes = {
		changePageStatus: PropTypes.func,
		openDrawer: PropTypes.func,
		currentLocation: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this.state = {
			string: '',
			currentLatitude: '',
			currentLongitude: '',
		};
	}
	async UNSAFE_componentWillMount() {
		OneSignal.init(config.OnesignalAppId);
		OneSignal.inFocusDisplaying(2);
		OneSignal.addEventListener('ids', this.onIds);
		// console.log('closedrawer in homeeeeeeeeeeeeeee');
		// if (this.props.drawerState === 'opened') {
			// console.log("inside home!!!!!!!!!!!!!")
		// 	await this.props.closeDrawer();
		// }
	}

	// componentWillUnmount() {
	// 	if (this.props.drawerState === 'opened') {
	// 		this.props.closeDrawer();
	// 	}
	// }

	componentWillMount() {
		this.props.currentLocation();
		if (this.props.pickUpAddress === undefined) {
			this.props.fetchAddressFromCoordinatesAsync(this.props.region);
		}
		BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('ids', this.onIds);
		BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()); // Remove listener
	}

	onIds = device => {
		this.oneSignalDeviceInfo = device;
		console.log('device info', device);
	};
	setLocationClicked() {
		this.props.destAddress
			? this.props.changePageStatus('confirmRide')
			: Actions.suggestLocation({
					heading: 'Destination Location',
					page: 'destination',
			  });
		if(this.props.pickUpAddress === undefined){	  
		this.props.fetchAddressFromCoordinatesAsync(this.props.region);
		}
	}
	backAndroid() {
		Actions.home(); // Return to previous screen
		return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
	}
	render() {
		return (
			<View pointerEvents="box-none" style={{ flex: 1 }}>
				<View style={styles.locateIcon}>
					<Col>
						<Row style={Platform.OS === 'ios' ? { top: -5 } : { top: -5 }}>
							<TouchableOpacity
								style={{ flexDirection: 'row', flex: 1 }}
								onPress={() => this.props.currentLocation()}
							>
								<Icon
									name="ios-locate"
									style={{
										fontSize: 40,
										color: commonColor.brandPrimary,
										backgroundColor: 'transparent',
									}}
								/>
							</TouchableOpacity>
						</Row>
					</Col>
				</View>
				<View style={styles.slideSelector}>
					<Button
						full
						style={{
							flex: 1,
							borderRadius: 0,
							height: 50,
						}}
						disabled={!this.props.isConnected}
						onPress={() => {
							this.setLocationClicked();
						}}
					>
						<Text style={{ color: '#ddd', fontSize: 18, fontWeight: '500' }}>Book Ride</Text>
					</Button>
				</View>
				<View style={styles.headerContainer} pointerEvents="box-none">
					<Header
						iosStatusbar="light-content"
						style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
						androidStatusBarColor={commonColor.statusBarLight}
					>
						<Left>
							<Button transparent onPress={() => Actions.drawerOpen()}>
								<Icon name="ios-menu" style={{ color: commonColor.brandPrimary }} />
							</Button>
						</Left>
						<Body>
							<Title style={{ color: commonColor.brandPrimary, marginTop: -2 }}>Taxi App</Title>
						</Body>
						<Right />
					</Header>
					<View style={Platform.OS === 'ios' ? styles.iosSrcdes : styles.aSrcdes}>
						<View style={styles.searchBar}>
							<View>
								<Item
									regular
									style={{
										backgroundColor: '#FFF',
										borderWidth: 0,
										marginLeft: 0,
										borderColor: 'transparent',
										borderRadius: 10,
									}}
								>
									<Icon name="ios-search" style={styles.searchIcon} />
									<Button
										onPress={() => {
											Actions.suggestLocation({
												heading: 'Starting Location',
												page: 'home',
											});
										}}
										transparent
										style={{ flex: 1, paddingLeft: 10 }}
									>
										<Text multiline={Platform.OS !== 'ios'} numberOfLines={1}>
											{this.props.pickUpAddress
												? _.get(this.props, 'pickUpAddress', 'Source Required')
												: _.get(this.props, 'currentAddress', 'Source Required')}
										</Text>
									</Button>
								</Item>
							</View>
						</View>
						<View style={styles.searchBar}>
							<View>
								<Item
									regular
									style={{
										backgroundColor: '#FFF',
										marginLeft: 0,
										borderColor: 'transparent',
										borderRadius: 10,
									}}
								>
									<Icon name="ios-search" style={styles.searchIcon} />
									<Button
										onPress={() => {
											Actions.suggestLocation({
												heading: 'Destination Location',
												page: 'destination',
											});
										}}
										transparent
										style={{ flex: 1, paddingLeft: 10 }}
									>
										{this.props.destAddress !== '' ? (
											<Text multiline={Platform.OS !== 'ios'} numberOfLines={1}>
												{_.get(this.props, 'destAddress', 'Enter Drop Location')}
											</Text>
										) : (
											<Text multiline={Platform.OS !== 'ios'} numberOfLines={1}>
												Enter Drop Location
											</Text>
										)}
									</Button>
								</Item>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		closeDrawer: () => dispatch(closeDrawer()),
		changeRegion: region => dispatch(changeRegion(region)),
		changePageStatus: newPage => dispatch(changePageStatus(newPage)),
		fetchUserCurrentLocationAsync: () => dispatch(fetchUserCurrentLocationAsync()),
		currentLocation: () => dispatch(currentLocation()),
		fetchAddressFromCoordinatesAsync: region => dispatch(fetchAddressFromCoordinatesAsync(region)),
	};
}
export default connect(
	mapStateToProps,
	bindActions
)(Home);
