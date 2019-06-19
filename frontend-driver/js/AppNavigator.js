import React, { Component } from "react";
import { StatusBar, Platform, BackHandler } from "react-native";
import { connect } from "react-redux";
// import { Drawer } from "native-base";
import { Scene, Router, Actions,Drawer,Modal } from "react-native-router-flux";
import PropTypes from "prop-types";
import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import Register from "./components/common/register/";
import SplashScreen from "react-native-splash-screen";
import DriverStartupService from "./components/driver/startupServices";
import DriverRootView from "./components/driver/rootView";
import DriverHome from "./components/driver/home";
import SideBar from "./components/driver/sideBar";
import SuggestLocation from "./components/driver/suggestLocation/";
import RideRequest from "./components/driver/rideRequest";
import Settings from "./components/driver/settings";
import UserDetails from "./components/driver/userDetails";
import History from "./components/driver/history";
import Earnings from "./components/driver/earnings";
import DriverAccessMessage from "./components/driver/driverAccessMessage";
import Documents from "./components/driver/documents";
import UploadFiles from "./components/driver/uploadFiles";
import LicenceDetails from "./components/driver/licenceDetails";
import CarDetails from "./components/driver/carDetails";
import BankDetails from "./components/driver/bankDetails";
import PickRider from "./components/driver/pickRider";
import StartRide from "./components/driver/startRide";
import DropOff from "./components/driver/dropOff";
import RateRider from "./components/driver/rateRider";
import { statusBarColor } from "./themes/base-theme";
import { getAppConfig } from "./actions/appConfig";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    driverJwtAccessToken: PropTypes.string
  };
  componentWillMount() {
    this.props.getAppConfig();
  }
  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  render() {
    return (

        // <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Modal>
             <Drawer key="SideBar"
                hideNavBar
                drawerWidth={300}
                contentComponent={SideBar}
                >
                  <Scene hideNavBar key="driverRootView" component={DriverRootView}>
                    <Scene hideNavBar key="driverHome" component={DriverHome} />
                    <Scene hideNavBar key="rideRequest" component={RideRequest} />
                    <Scene hideNavBar key="pickRider" component={PickRider} />
                    <Scene hideNavBar key="startRide" component={StartRide} />
                    <Scene hideNavBar key="dropOff" component={DropOff} />
                    <Scene hideNavBar key="rateRider" component={RateRider} />
                  </Scene>
                  <Scene hideNavBar key="userDetails" component={UserDetails} />
                  <Scene hideNavBar key="earnings" component={Earnings} />
                  <Scene hideNavBar key="history" component={History} />
                  <Scene hideNavBar key="suggestLocation" component={SuggestLocation} />
                  <Scene hideNavBar key="settings" component={Settings} />
                  <Scene
                    key="login"
                    component={Login}
                    hideNavBar
                    initial={!this.props.driverJwtAccessToken ? true : false}
                  />
                  <Scene hideNavBar key="signIn" component={SignIn} />
                  <Scene hideNavBar key="register" component={Register} />
                  <Scene hideNavBar key="driverAccessMessage" component={DriverAccessMessage} />
                  <Scene hideNavBar key="documents" component={Documents} />
                  <Scene hideNavBar key="uploadFiles" component={UploadFiles} />
                  <Scene hideNavBar key="licenceDetails" component={LicenceDetails} />
                  <Scene hideNavBar key="carDetails" component={CarDetails} />
                  <Scene hideNavBar key="bankDetails" component={BankDetails} />
                  <Scene
                    key="driverStartupService"
                    component={DriverStartupService}
                    hideNavBar
                    initial={this.props.driverJwtAccessToken}
                  />
          </Drawer>
        </Modal>
      </RouterWithRedux>

    );
  }
}
function bindAction(dispatch) {
  return {
    getAppConfig: () => dispatch(getAppConfig())
  };
}
const mapStateToProps = state => ({
  driverApproved: state.driver.user.isApproved,
  driverJwtAccessToken: state.driver.appState.jwtAccessToken
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
