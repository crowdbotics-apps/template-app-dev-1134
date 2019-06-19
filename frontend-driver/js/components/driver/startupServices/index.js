import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Spinner } from "native-base";
import OneSignal from "react-native-onesignal";

import {
  fetchUserCurrentLocationAsync,
  mapDeviceIdToUser
} from "../../../actions/driver/home";
import {
  socketDriverInit,
  updateLocation
} from "../../../services/driversocket";
import DriverRootView from "../rootView";
import * as appStateSelector from "../../../reducers/driver/appState";
import config from "../../../../config";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.driver.user.gpsLoc[1],
      longitude: state.driver.user.gpsLoc[0],
      latitudeDelta: state.driver.user.latitudeDelta,
      longitudeDelta: state.driver.user.latitudeDelta * aspectRatio
    },
    user: state.driver.user,
    isInitialLocationFetched: appStateSelector.isInitialLocationFetched(state),
    jwtAccessToken: state.driver.appState.jwtAccessToken
  };
}

class DriverStartupServices extends Component {
  static propTypes = {
    fetchUserCurrentLocationAsync: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isInitialLocationFetched: PropTypes.bool,
    region: PropTypes.object
  };

  state = {
    notification: {}
  };

  UNSAFE_componentWillMount() {
    OneSignal.init(config.OnesignalAppId);
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    const { mapDeviceIdToUser, jwtAccessToken } = this.props;
    OneSignal.getPermissionSubscriptionState(status => {
      console.log(status.userId, status.pushToken);
      mapDeviceIdToUser(jwtAccessToken, status.userId, status.pushToken);
    });

    // mapDeviceIdToUser(jwtAccessToken, deviceId, token);
  }
  componentDidMount() {
    socketDriverInit();
    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }
  onIds = device => {
    this.oneSignalDeviceInfo = device;
    console.log("device info", device);
    // alert(device);
  };
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }
  render() {
    // eslint-disable-line class-methods-use-this
    if (this.props.isInitialLocationFetched) {
      return <DriverRootView initialRegion={this.props.region} />;
    }
    return <Spinner />;
  }
}

function bindActions(dispatch) {
  return {
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) =>
      dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken))
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(DriverStartupServices);
