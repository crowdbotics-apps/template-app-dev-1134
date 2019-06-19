import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Text } from 'react-native';
import { Icon } from 'native-base';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FAIcon from "react-native-vector-icons/FontAwesome";

import { updatePickupRegion } from '../../../services/ridersocket';
import { openDrawer } from '../../../actions/drawer';
import {
	fetchUserCurrentLocationAsync,
	changeRegion,
	clearTripAndTripRequest,
	changePageStatus,
	syncDataAsync,
	fetchAddressFromCoordinatesAsync,
} from '../../../actions/rider/home';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import { clearReducerState } from '../../../actions/rider/receipt';
import { fetchFareDetail } from '../../../actions/rider/confirmRide';
import * as appStateSelector from '../../../reducers/rider/appState';
import * as userSelector from '../../../reducers/rider/user';
import Home from '../home';
import ConfirmRide from '../confirmRide';
import RideBooked from '../rideBooked';
import Receipt from '../receipt';
import styles from './styles';
import confirmRide from '../confirmRide';


let that = null;
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const markerIDs = ['dest', 'src'];

function mapStateToProps(state) {
	return {
		region: {
			longitude: state.rider.user.gpsLoc[0],
			latitude: state.rider.user.gpsLoc[1],
			latitudeDelta: state.rider.user.latitudeDelta,
			longitudeDelta: state.rider.user.latitudeDelta * aspectRatio,
		},
		tripRequest: state.rider.tripRequest,
		// pickupLatitude: state.rider.tripRequest.srcLoc[0],
		// pickupLongitude: state.rider.tripRequest.srcLoc[1],
		pickupLatitude: state.rider.tripRequest.srcLoc[1],
		pickupLongitude: state.rider.tripRequest.srcLoc[0],
		pageStatus: state.rider.appState.pageStatus,
		driverCurrentGpsLocLat: !state.rider.tripRequest.driver ? undefined : state.rider.tripRequest.driver.gpsLoc[1],
		driverCurrentGpsLocLong: !state.rider.tripRequest.driver ? undefined : state.rider.tripRequest.driver.gpsLoc[0],
		jwtAccessToken: state.rider.appState.jwtAccessToken,
		tripRequestStatus: state.rider.tripRequest.tripRequestStatus,
		tripStatus: state.rider.trip.tripStatus,
		user: state.rider.user,
		srcLoc: state.rider.tripRequest.srcLoc,
		destLoc: state.rider.tripRequest.destLoc,
		pickUpAddress: state.rider.tripRequest.pickUpAddress,
		destAddress: state.rider.tripRequest.destAddress,
		markers: appStateSelector.getMarkers(state),
		driversList: userSelector.getNearbyDriversLocation(state),
		apiKey: state.basicAppConfig.config.googleMapsApiKey,
	};
}
class RootView extends Component {
	static propTypes = {
		pickupLatitude: PropTypes.number,
		pickupLongitude: PropTypes.number,
		driverCurrentGpsLocLat: PropTypes.number,
		driverCurrentGpsLocLong: PropTypes.number,
		jwtAccessToken: PropTypes.string,
		syncDataAsync: PropTypes.func,
		fetchAddressFromCoordinatesAsync: PropTypes.func,
		pageStatus: PropTypes.string,
		changeRegion: PropTypes.func,
		changePageStatus: PropTypes.func,
		tripRequestStatus: PropTypes.string,
		tripStatus: PropTypes.string,
		user: PropTypes.object,
		driversList: PropTypes.array,
		initialRegion: PropTypes.object,
		destLoc: PropTypes.array,
	};

	constructor(props) {
		super(props);
		this.state = {
			coords: [],
			mapReady: false,
		};
	}

	UNSAFE_componentWillMount() {
		that = this;
		if (this.props.tripRequestStatus === 'request') {
			this.props.changePageStatus('confirmRide');
		} else {
			this.props.syncDataAsync(this.props.jwtAccessToken);
		}

		if (this.props.destLoc[1] !== undefined) {
			if (this.props.pageStatus === 'confirmRide') {
				this.showDirection(this.props.pickUpAddress, this.props.destAddress);
			}
			if (this.props.tripStatus === 'onTrip') {
				this.showDirection(
					[this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
					this.props.destAddress
				);
			}
			if (
				this.props.pageStatus === 'rideBooked' &&
				this.props.tripStatus !== 'onTrip' &&
				this.props.destLoc[1] !== undefined
			) {
				this.showDirection(
					[this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
					this.props.pickUpAddress
				);
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.destLoc[0] && nextProps.destLoc[0]) {
			this.setDestMap();
		}
		if (this.props.pickUpAddress !== nextProps.pickUpAddress || this.props.destAddress !== nextProps.destAddress) {
			this.showDirection(nextProps.pickUpAddress, nextProps.destAddress);
		}

		if (
			this.props.tripStatus === 'onTrip' &&
			this.props.driverCurrentGpsLocLat !== nextProps.driverCurrentGpsLocLat &&
			this.props.destAddress !== nextProps.destAddress
		) {
			this.showDirection(
				[this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
				this.props.destAddress
			);
		}
		if (
			this.props.pageStatus === 'rideBooked' &&
			this.props.tripStatus !== 'onTrip' &&
			this.props.destLoc[0] !== undefined &&
			this.props.driverCurrentGpsLocLat !== nextProps.driverCurrentGpsLocLat &&
			this.props.pickUpAddress !== nextProps.pickUpAddress
		) {
			this.showDirection(
				[this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
				this.props.pickUpAddress
			);
		}
	}

	setDestMap() {
		if (this.props.pageStatus === 'confirmRide' && this.props.destLoc[0] !== undefined) {
			const gpsLoc = _.get(this.props, 'tripRequest.destLoc', 'user.gpsLoc');
			const obj = {
				latitude: gpsLoc[1],
				longitude: gpsLoc[0],
			};
			if (_.isEmpty(obj) === false) {
				this.map.fitToCoordinates([obj], {
					edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
					animated: true,
				});
			}
		}
	}
	async showDirection(startLoc, destinationLoc) {
		try {
			const resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${
					this.props.apiKey
				}`
			);
			const respJson = await resp.json();
			const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			const distance = respJson.routes[0].legs.map(leg => leg.distance.value).reduce((a, c) => a + c);
			const coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1],
				};
			});
			this.setState({
				coords: coords,
				distance: distance,
			});
		} catch (error) {
			console.log(error, ' map line issue ');
		}
	}

	onRegionChange(region) {
		this.setState({ region });
	}
	_renderNearByDrivers() {
		if (this.props.pageStatus === 'home'&& this.props.driversList) {
			console.log(this.props.driversList,"All Driver")
			return (
			     this.props.driversList.map((coordinate, index) => (
				<MapView.Marker key={index} coordinate={coordinate}>
					  <View>
						<Icon name="ios-car" style={styles.carIcon} />
						</View>
					
				</MapView.Marker>
			)));
		}
		return <View />;
	}
	_renderRiderMarker() {
		if (
			this.props.tripStatus !== 'onTrip' &&
			this.props.tripStatus !== 'endTrip' &&
			this.props.pickupLatitude !== undefined && this.props.pageStatus !== 'confirmRide' && this.props.pageStatus !=="home" && this.props.pageStatus !== "rideBooked"
		) {
			return (
				<MapView.Marker
					identifier="RiderMarker"
					coordinate={{
						latitude: this.props.pickupLatitude,
						longitude: this.props.pickupLongitude,
					}}

				>
					<View>
						<Icon name="ios-pin" style={styles.pinIcon} />
					</View>
				</MapView.Marker>
			);
		}
		return <View />;
	}
	_renderSourceMarker(){
		if(this.props.pageStatus === "confirmRide" && this.props.pickupLatitude !== undefined){
			return(
				<MapView.Marker
					identifier="SourceMarker"
					coordinate={{
						latitude: this.props.pickupLatitude,
						longitude: this.props.pickupLongitude,
					}}
					pinColor="green"
				/>
			)
		}
	}
	_renderDestRiderMarker(){
		if(this.props.pageStatus === 'rideBooked' && this.props.destLoc[0] !== undefined){
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
	_renderDirectionLine() {
		if (
			this.props.pageStatus !== 'home' &&
			this.props.pageStatus === 'confirmRide' &&
			this.props.destLoc[0] !== undefined
		) {
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		}
		if (
			this.props.pageStatus === 'rideBooked' &&
			this.props.tripStatus !== 'onTrip' &&
			this.props.destLoc[0] !== undefined
		) {
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		}
		if (this.props.tripStatus === 'onTrip' && this.props.destLoc[0] !== undefined) {
			return (
				<MapView.Polyline
					coordinates={this.state.coords}
					strokeWidth={2}
					strokeColor={commonColor.brandPrimary}
				/>
			);
		}
		return <View />;
	}
	_renderDriverMarker() {
		if (
			this.props.pageStatus !== 'home' &&
			this.props.pageStatus !== 'confirmRide' &&
			this.props.driverCurrentGpsLocLat !== undefined
		) {
			return (
				<MapView.Marker
					identifier="DriverMarker"
					coordinate={{
						latitude: this.props.driverCurrentGpsLocLat,
						longitude: this.props.driverCurrentGpsLocLong,
					}}
				>
					<View>
						<Icon name="ios-car" style={styles.carIcon} />
					</View>
				</MapView.Marker>
			);
		}
		return <View />;
	}
	_renderUserLocationMarker(){
        if(this.props.pageStatus === "home" || "confirmRide"){
			console.log(this.props.region,"Hello")
			return (
				<MapView.Marker
				 identifier="UserLocation"
				 coordinate={this.props.region}
				> 
				 <View>
				 <FAIcon
              name="circle"
              style={{
                fontSize: 15,
                color: "#339FFF",
                backgroundColor: "transparent"
              }}
            />
				 </View>
				</MapView.Marker>
			);
		}
		return <View/>;
	}

	_fittoSuppliedMarkersbooked() {
		var markers = [
			{
				titl: 'dri',
				coordinate: {
					latitude: this.props.driverCurrentGpsLocLat,
					longitude: this.props.driverCurrentGpsLocLong,
				},
			},
			{
				titl: 'rid',
				coordinate: {
					latitude: this.props.pickupLatitude,
					longitude: this.props.pickupLongitude,
				},
			},
		];
		markers.map((marker, index) => (
			<MapView.Marker
				key={index}
				title={marker.titl}
				coordinate={marker.coordinate}
				style={{ marginTop: 150, marginBottom: 180, marginLeft: 20, marginRight: 20 }}
			/>
		));

		this.map.fitToCoordinates([markers[0].coordinate, markers[1].coordinate], {
			animated: true,
		});
		console.log(markers, this.map.fitToCoordinates, '****************************@@@@@@@@@@@@@@@');
		// this.map.fitToElements(true, false);
	}
	_fittoSuppliedMarkersontrip() {
		if (this.props.tripStatus === 'onTrip' && this.props.destLoc[0] !== undefined) {
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
			markers.map((marker, index) => (
				<MapView.Marker title={marker.titl} key={index} coordinate={marker.coordinate} style={{ margin: 20 }} />
			));
			console.log(markers, '****************************!!!!!!!!!!!!!!!');
			this.map.fitToCoordinates([markers[0].coordinate, markers[1].coordinate], {
				animated: true,
			});
			// this.map.fitToElements(true, false);
		}
	}
	_fittoSuppliedMarkersconf() {
		if (this.props.pageStatus === 'confirmRide' && this.props.destLoc[0] !== undefined && this.state.mapReady) {
			console.log(this.props.destLoc,"insideMarkerSupplied",this.props)
			var markers = [
				{
					titl: 'src',
					coordinate: {
						latitude: this.props.pickupLatitude,
						longitude: this.props.pickupLongitude,
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
			markers.map((marker, index) => (
				<MapView.Marker
					// title={marker.titl}
					key={index}
					coordinate={marker.coordinate}
					style={{ margin: 20 }}
				/>
			));
			console.log(markers, '****************************%%%%%%%%%%%%%%%%%%%');
			this.map.fitToCoordinates([markers[1].coordinate, markers[0].coordinate], {
				animated: true,
			});
		}
	}

	_renderDestMarker() {
		if (
			(this.props.pageStatus !== 'home' &&
				this.props.pageStatus === 'confirmRide' &&
				this.props.destLoc[0] !== undefined) ||
			this.props.tripStatus === 'onTrip'
		) {
			return (
				<MapView.Marker
					identifier="dest"
					coordinate={{
						latitude: this.props.destLoc[1],
						longitude: this.props.destLoc[0],
					}}
				/>
			);
		} else {
			return <View />;
		}
	}

	render() {
		let component = null;
		//console.error(this.props.pageStatus)
		switch (this.props.pageStatus) {
			case 'home':
				component = <Home />;
				break;
			case 'confirmRide':
				component = <ConfirmRide />;
				break;
			case 'rideBooked':
				component = <RideBooked />;
				break;
			case 'receipt':
				component = <Receipt />;
				//component = <Home />;
				break;
			default:
				component = <Home />;
		}
		return (
			<View style={styles.container}>
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					style={
						this.props.pageStatus === 'confirmRide'
							? styles.confirmmap
							: this.props.pageStatus === 'rideBooked' && this.props.tripStatus !== 'onTrip'
							? styles.ridebookedmmap
							: this.props.tripStatus === 'onTrip'
							? styles.ontripmap
							: styles.map
					}
					onMapReady={() => {
						this.setState({ mapReady: true });
					}}
					followsUserLocation
					// showsUserLocation={this.props.pageStatus === "confirmRide"&&true}
					fitToElements={MapView.IMMEDIATE_FIT}
					initialRegion={this.props.initialRegion}
					onRegionChangeComplete={region => {
						if (this.props.pageStatus === 'home') {
							
							updatePickupRegion(this.props.user, region); // socket call
							
							// this.props.changeRegion(region);
							// this.props.fetchAddressFromCoordinatesAsync(region);
						}
					}}
				>   
				    {this._renderSourceMarker()}
					{this._renderUserLocationMarker()}
					{this._renderNearByDrivers()}
					{this._renderDriverMarker()}
					{this.props.destLoc[0]!== undefined ? this._renderDestRiderMarker():null}
					{this.props.destLoc[0] !== undefined ? this._renderDestMarker() : null}
					{this.props.pickupLatitude !== undefined ? this._renderRiderMarker() : null}


					{this.props.destLoc[0] !== undefined ? this._renderDirectionLine() : null}

					{this.props.destLoc[0] !== undefined && this.state.mapReady
						? this._fittoSuppliedMarkersconf()
						: null}
					{this.props.pageStatus === 'rideBooked' &&
					this.props.destLoc[0] !== undefined &&
					this.props.tripStatus !== 'onTrip' &&
					this.state.mapReady
						? this._fittoSuppliedMarkersbooked()
						: null}
					{this.props.destLoc[0] !== undefined && this.props.tripStatus === 'onTrip' && this.state.mapReady
						? this._fittoSuppliedMarkersontrip()
						: null}
				</MapView>

				{component}
			</View>
		);
	}
}
function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		fetchUserCurrentLocationAsync: () => dispatch(fetchUserCurrentLocationAsync()),
		changeRegion: region => dispatch(changeRegion(region)),
		fetchAddressFromCoordinatesAsync: region => dispatch(fetchAddressFromCoordinatesAsync(region)),
		clearTripAndTripRequest: () => dispatch(clearTripAndTripRequest()),
		changePageStatus: newPage => dispatch(changePageStatus(newPage)),
		syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
		clearReducerState: () => dispatch(clearReducerState()),
		fetchFareDetail: tripCoordinates => dispatch(fetchFareDetail(tripCoordinates)),
	};
}

function setCurrentMap() {
	const gpsLoc = that.props.user.gpsLoc;
	const obj = {
		latitude: gpsLoc[1],
		longitude: gpsLoc[0],
	};
	that.map.fitToCoordinates([obj], {
		// edgePadding: {
		//   top: Platform.OS === 'android' ? 350 : 150,
		//   right: 20,
		//   left: 20,
		//   // bottom: (Platform.OS === 'android') ? 800 : 320;
		// },
		animated: true,
	});
}

export { setCurrentMap };
export default connect(
	mapStateToProps,
	bindActions
)(RootView);
