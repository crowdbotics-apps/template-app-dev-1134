import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Dimensions } from 'react-native';
import { Icon, Text } from 'native-base';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import Polyline from '@mapbox/polyline';

import { socketDriverInit, updateLocation } from '../../../services/driversocket';
import { clearReducerState } from '../../../actions/driver/rateRider';
import { requestTripUpdated } from '../../../actions/driver/rideRequest';
import { fetchUserCurrentLocationAsync, syncDataAsync } from '../../../actions/driver/home';

import DriverHome from '../home';
import RideRequest from '../rideRequest';
import PickRider from '../pickRider';
import StartRide from '../startRide';
import DropOff from '../dropOff';
import RateRider from '../rateRider';
import commonColor from '../../../../native-base-theme/variables/commonColor';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
let that = null;

function mapStateToProps(state) {
	return {
		tripRequest: state.driver.tripRequest,
		trip: state.driver.trip,
		user: state.driver.user,
		pageStatus: state.driver.appState.pageStatus,
		jwtAccessToken: state.driver.appState.jwtAccessToken,
		region: {
			latitude: state.driver.user.gpsLoc[1],
			longitude: state.driver.user.gpsLoc[0],
			latitudeDelta: state.driver.user.latitudeDelta,
			longitudeDelta: state.driver.user.longitudeDelta,
		},
		riderPickupLocLat: !state.driver.tripRequest.srcLoc[1] ? undefined : state.driver.tripRequest.srcLoc[1],
		riderPickupLocLong: !state.driver.tripRequest.srcLoc[0] ? undefined : state.driver.tripRequest.srcLoc[0],
		driverCurrentGpsLocLat: !state.driver.tripRequest.driver
			? undefined
			: state.driver.tripRequest.driver.gpsLoc[1],
		driverCurrentGpsLocLong: !state.driver.tripRequest.driver
			? undefined
			: state.driver.tripRequest.driver.gpsLoc[0],
		pickUpAddress: state.driver.tripRequest.pickUpAddress,
		destAddress: state.driver.tripRequest.destAddress,
		destLoc: state.driver.tripRequest.destLoc,
		apiKey: state.basicAppConfig.config.googleMapsApiKey,
	};
}

class DriverRootView extends Component {
	static propTypes = {
		user: PropTypes.object,
		pageStatus: PropTypes.string,
		region: PropTypes.object,
		riderPickupLocLat: PropTypes.number,
		riderPickupLocLong: PropTypes.number,
		fetchUserCurrentLocationAsync: PropTypes.func,
		initialRegion: PropTypes.object,
	};
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: this.props.region.latitude,
				longitude: this.props.region.longitude,
				latitudeDelta: this.props.region.latitudeDelta,
				longitudeDelta: this.props.region.longitudeDelta * aspectRatio,
			},
			mapRegion: {
				latitude: this.props.region.latitude,
				longitude: this.props.region.longitude,
				latitudeDelta: this.props.region.latitudeDelta,
				longitudeDelta: this.props.region.longitudeDelta * aspectRatio,
			},
			coords: [],
			mapReady: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (
			(this.props.pageStatus === 'pickRider' &&
				this.props.riderPickupLocLat !== undefined &&
				this.props.region !== nextProps.region) ||
			this.props.tripRequest.pickUpAddress !== nextProps.tripRequest.pickUpAddress
		) {
			this.showDirection([nextProps.region.latitude, nextProps.region.longitude], nextProps.tripRequest.pickUpAddress);
		}

		if (
			(this.props.pageStatus === 'startRide' &&
				this.props.riderPickupLocLat !== undefined &&
				this.props.region !== nextProps.region) ||
			this.props.destAddress !== nextProps.destAddress
		) {
			this.showDirection([nextProps.region.latitude, nextProps.region.longitude], nextProps.destAddress);
		}
		if (
			(this.props.pageStatus === 'dropOff' &&
				this.props.destLoc[0] !== undefined &&
				this.props.region !== nextProps.region) ||
			this.props.destAddress !== nextProps.destAddress
		) {
			this.showDirection([nextProps.region.latitude, nextProps.region.longitude], nextProps.destAddress);
		}
	}

	UNSAFE_componentWillMount() {
		that = this;
		this.props.syncDataAsync(this.props.jwtAccessToken);
		if (this.props.destLoc[0] !== undefined) {
			if (this.props.pageStatus === 'pickRider' && this.props.riderPickupLocLat !== undefined) {
				this.showDirection(
					[this.props.region.latitude, this.props.region.longitude],
					this.props.tripRequest.pickUpAddress
				);
			}
			if (this.props.pageStatus === 'startRide' && this.props.riderPickupLocLat !== undefined) {
				this.showDirection([this.props.region.latitude, this.props.region.longitude], this.props.destAddress);
			}
			if (this.props.pageStatus === 'dropOff' && this.props.destLoc[0] !== undefined) {
				this.showDirection([this.props.region.latitude, this.props.region.longitude], this.props.destAddress);
			}
		}
	}

	async showDirection(startLoc, destinationLoc) {
		try {
			let resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${
					this.props.apiKey
				}`
			);
			let respJson = await resp.json();
			console.log(respJson, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
			let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			let distance = respJson.routes[0].legs.map(leg => leg.distance.value).reduce((a, c) => a + c);
			let coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1],
				};
			});
			console.log('show direction func');
			this.setState({ coords: coords });
		} catch (error) {
			console.log(error);
		}
	}

	_renderRiderMarker() {
		if (
			this.props.riderPickupLocLat !== undefined &&
			(this.props.pageStatus === 'onTrip' ||
				this.props.pageStatus === 'rideRequest' ||
				this.props.pageStatus === 'pickRider' ||
				this.props.pageStatus === 'startRide')
		) {
			return (
				<MapView.Marker
					identifier="RiderMarker"
					coordinate={{
						latitude: this.props.riderPickupLocLat,
						longitude: this.props.riderPickupLocLong,
					}}
				>
					<View>
						<Icon name="ios-pin" style={{ fontSize: 24 }} />
					</View>
				</MapView.Marker>
			);
		}
		return <View />;
	}
	_renderDriverMarker() {
		if (this.props.riderPickupLocLat !== undefined) {
			return (
				<MapView.Marker
					identifier="DriverMarker"
					coordinate={{
						latitude: this.props.region.latitude,
						longitude: this.props.region.longitude,
					}}
				>
					{this.props.pageStatus === 'rateRider' ? (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								paddingTop: 10,
							}}
						>
							<View style={styles.locationContainer}>
								<Text
									style={{
										fontSize: 14,
										color: '#FF6005',
										textAlign: 'center',
										borderRadius: 4,
									}}
								>
									Your Location
								</Text>
							</View>
							<View style={styles.triangle} />
							<Icon name="ios-pin" style={{ fontSize: 24, color: '#FF6005', marginTop: 10 }} />
						</View>
					) : (
						<View>
							<Icon name="ios-car" style={{ alignSelf: 'center', flex: 1 }} />
						</View>
					)}
				</MapView.Marker>
			);
		}
		return <View />;
	}
	_renderDirectionLinePick() {
		if (
			this.props.pageStatus === 'pickRider'
		) {
			console.log("inside pickRider !!!!! ",this.state.coords)
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		} else {
			return <View />;
		}
	}
	_renderDesRiderLocMarker(){
		if(this.props.pageStatus === 'startRide' && this.props.destLoc[0]!== undefined){
			return(
				<MapView.Marker
					identifier="SourceMarker"
					coordinate={{
						latitude: this.props.destLoc[1],
						longitude: this.props.destLoc[0],
					}}
					pinColor="red"
				/>
			)
		}
	}
	_renderDirectionLinestart() {
		if (
			this.props.pageStatus === 'startRide' &&
			this.props.riderPickupLocLat !== undefined &&
			this.props.destLoc[0] !== undefined
		) {
			console.log(this.state.coords,"inside RenderDirectionLineStart Start Ride")
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		} else {
			return <View />;
		}
	}
	_renderRiderdestMarker(){
		if (this.props.pageStatus === 'dropOff' && this.props.destLoc[0] !== undefined){
			return(
				<MapView.Marker
					identifier="SourceMarker"
					coordinate={{
						latitude: this.props.destLoc[1],
						longitude: this.props.destLoc[0],
					}}
					pinColor="red"
				/>
			)
		}
	}
	_renderDirectionLinesdrop() {
		if (this.props.pageStatus === 'dropOff' && this.props.destLoc[0] !== undefined) {
			console.log(this.state.coords,"Inside DropOff  #####")
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		} else {
			return <View />;
		}
	}
	_fittoSuppliedMarkersstart() {
		// console.log("inside _fittoSuppliedMarkersStart")
		var markers = [
			{
				titl: 'src',
				coordinate: {
					latitude: this.props.driverCurrentGpsLocLat,
					longitude: this.props.driverCurrentGpsLocLong,
				},
			},
			{
				titl: 'dest',
				coordinate: {
					latitude: this.props.destLoc[1],
					longitude: this.props.destLoc[0],
				},
			},
		];
		markers.map(marker => (
			<MapView.Marker title={marker.titl} coordinate={marker.coordinate} style={{ margin: 80 }} />
		));
		console.log(markers, this.map.fitToCoordinates, 'start---123243565768790-1234568790');
		this.map.fitToCoordinates([markers[0].coordinate, markers[1].coordinate], {
			animated: true,
		});
		// this.map.fitToElements(true, false);
	}

	_fittoSuppliedMarkerspick() {
		var markers = [
			{
				titl: 'src',
				coordinate: {
					latitude: this.props.driverCurrentGpsLocLat,
					longitude: this.props.driverCurrentGpsLocLong,
				},
			},
			{
				titl: 'dest',
				coordinate: {
					latitude: this.props.riderPickupLocLat,
					longitude: this.props.riderPickupLocLong,
				},
			},
		];
		markers.map(marker => (
			<MapView.Marker title={marker.titl} coordinate={marker.coordinate} style={{ margin: 80 }} />
		));
		this.map.fitToCoordinates([markers[0].coordinate, markers[1].coordinate], {
			animated: true,
		});
		// this.map.fitToElements(true, false);
	}
	_fittoSuppliedMarkersdrop() {
		let markers = [
			{
				titl: 'src',
				coordinate: {
					latitude: this.props.driverCurrentGpsLocLat,
					longitude: this.props.driverCurrentGpsLocLong,
				},
			},
			{
				titl: 'dest',
				coordinate: {
					latitude: this.props.destLoc[1],
					longitude: this.props.destLoc[0],
				},
			},
		];
		markers.map(marker => (
			<MapView.Marker title={marker.titl} coordinate={marker.coordinate} style={{ margin: 80 }} />
		));
		console.log(markers, '123243565768790-1234568790@@@');
		this.map.fitToCoordinates([markers[0].coordinate, markers[1].coordinate], {
			animated: true,
		});
		// this.map.fitToElements(true, false);
	}
	_renderSrcMarker() {
		if (
			this.props.pageStatus !== 'home' &&
			this.props.pageStatus === 'PickRider' &&
			this.props.destLoc[0] !== undefined
		) {
			return (
				<MapView.Marker
					identifier="src"
					coordinate={{
						latitude: this.props.srcLoc[1],
						longitude: this.props.srcLoc[0],
					}}
				/>
			);
		} else {
			return <View />;
		}
	}
	// _renderDestMarker() {
	// 	if (
	// 		this.props.pageStatus !== 'home' &&
	// 		(this.props.pageStatus === 'startRide' || this.props.pageStatus === 'dropOff') &&
	// 		this.props.destLoc[0] !== undefined
	// 	) {
	// 		return (
	// 			<MapView.Marker
	// 				identifier="dest"
	// 				coordinate={{
	// 					latitude: this.props.destLoc[0],
	// 					longitude: this.props.destLoc[1],
	// 				}}
	// 			/>
	// 		);
	// 	} else {
	// 		return <View />;
	// 	}
	// }
	render() {
		
		console.log(this.props, '!!!!!!!!!!!************');
		if (this.props.user.fname === undefined) {
			return <View />;
		}
		let component = null;
		switch (this.props.pageStatus) {
			case 'home':
				component = <DriverHome />;
				break;
			case 'rideRequest':
				component = <RideRequest />;
				break;
			case 'pickRider':
				component = <PickRider />;
				break;
			case 'startRide':
				component = <StartRide />;
				break;
			case 'dropOff':
				component = <DropOff />;
				break;
			case 'rateRider':
				component = <RateRider />;
				break;
			default:
				component = <DriverHome />;
		}
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<MapView
					// ref={ref => {
					// 	this.map = ref;
					// 	ref !== null ? this.map.fitToElements(true, false) : null;
					// }}
					ref={ref => {
						this.map = ref;
					}}
					style={
						this.props.pageStatus === 'pickRider'
							? styles.pickMap
							: this.props.pageStatus === 'startRide'
							? styles.startMap
							: this.props.pageStatus === 'dropOff'
							? styles.dropMap
							: styles.map
					}
					initialRegion={this.props.initialRegion}
					onMapReady={() => {
						this.setState({ mapReady: true });
					}}
					fitToElements={MapView.IMMEDIATE_FIT}
					// showsUserLocation={true}
					followsUserLocation
					// region={this.state.mapRegion}  region should not be fixed when passing markers to fit to elements
				>
					{/* {this._renderDestMarker()} */}
					{this.props.destLoc[0] !== undefined ? this._renderRiderMarker() : null}
					{this._renderDriverMarker()}
					{this.props.pageStatus === 'pickRider' ? this._renderDirectionLinePick() : null}
					{this.props.pageStatus === 'startRide' ? this._renderDesRiderLocMarker():null}
					{this.props.pageStatus === 'startRide' ? this._renderDirectionLinestart() : null}
					{this.props.pageStatus === 'dropOff' ? this._renderRiderdestMarker() : null}
					{this.props.pageStatus === 'dropOff' ? this._renderDirectionLinesdrop() : null}
					{this.props.pageStatus === 'startRide' &&
					this.props.riderPickupLocLat !== undefined &&
					this.props.destLoc[0] !== undefined &&
					this.state.mapReady
						? this._fittoSuppliedMarkersstart()
						: null}
					{this.props.pageStatus === 'pickRider' && this.props.destLoc[0] !== undefined && this.state.mapReady
						? this._fittoSuppliedMarkerspick()
						: null}
					{this.props.pageStatus === 'dropOff' && this.props.destLoc[0] !== undefined && this.state.mapReady
						? this._fittoSuppliedMarkersdrop()
						: null}
				</MapView>
				{component}
			</View>
		);
	}
}

function bindActions(dispatch) {
	return {
		clearReducerState: () => dispatch(clearReducerState()),
		requestTripUpdated: status => dispatch(requestTripUpdated(status)),
		fetchUserCurrentLocationAsync: () => dispatch(fetchUserCurrentLocationAsync()),
		syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
	};
}
function setCurrentMapDriver() {
	const gpsLoc = that.props.user.gpsLoc;
	const obj = {
		latitude: gpsLoc[1],
		longitude: gpsLoc[0],
	};
	that.map.fitToCoordinates([obj], {
		// edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
		animated: true,
	});
}

export { setCurrentMapDriver };

export default connect(
	mapStateToProps,
	bindActions
)(DriverRootView);
