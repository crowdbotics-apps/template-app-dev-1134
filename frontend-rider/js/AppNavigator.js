import React, { Component } from "react";
import { StatusBar, BackHandler } from "react-native";
import { connect } from "react-redux";
import { Scene, Router, Actions, Stack,Drawer,Modal } from "react-native-router-flux";
import PropTypes from "prop-types";
import SplashScreen from "react-native-splash-screen";
import { getAppConfig } from "./actions/appConfig";
import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import Register from "./components/common/register/";
import RiderStartupService from "./components/rider/startupServices";
import RootView from "./components/rider/rootView";
import Home from "./components/rider/home/";
import SuggestLocation from "./components/rider/suggestLocation/";
import SideBar from "./components/rider/sideBar";
import Payment from "./components/rider/payment";
import History from "./components/rider/history";
import Notifications from "./components/rider/notifications";
import Settings from "./components/rider/settings";
import UserDetails from "./components/rider/userDetails";
import CardPayment from "./components/rider/cardPayment";
import CreditCardq from "./components/rider/creditCard";
import SaveCards from "./components/rider/saveCards";
import PaymentDetails from "./components/rider/paymentDetails";
import PaymentConfirm from "./components/rider/paymentConfirm";
import ConfirmRide from "./components/rider/confirmRide";
import RideBooked from "./components/rider/rideBooked";
import Receipt from "./components/rider/receipt";
// import SideBar from "./components/rider/sideBar"
import { statusBarColor } from "./themes/base-theme";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    riderJwtAccessToken: PropTypes.string
  };

  UNSAFE_componentWillMount() {
    this.props.getAppConfig();
  }
  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
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
        <RouterWithRedux>
           <Scene key ="root">
            <Drawer key="SideBar"
            hideNavBar
            drawerWidth={300}
            contentComponent={SideBar}
            >
             <Scene hideNavBar key="home" component={Home} />
             <Scene hideNavBar key="setting" component={Settings}/>
             <Scene hideNavBar key="history" component={History} />
             <Scene hideNavBar key="cardPayment" component={CardPayment} />
             <Scene
              key="login"
              component={Login}
              hideNavBar
              initial={!this.props.riderJwtAccessToken ? true : false}
             />
             <Scene hideNavBar key="signIn" component={SignIn} />
             <Scene hideNavBar key="register" component={Register} />

             <Scene
              key="riderStartupService"
              component={RiderStartupService}
              hideNavBar
              initial={this.props.riderJwtAccessToken}
             />
             <Scene hideNavBar key="rootView" component={RootView} />  
             </Drawer>
            <Scene hideNavBar key="confirmRide" component={ConfirmRide} />
            <Scene hideNavBar key="rideBooked" component={RideBooked} />
            <Scene hideNavBar key="sideBar" component={SideBar} />
            <Scene
              key="suggestLocation"
              component={SuggestLocation}
              hideNavBar
            />
            <Scene hideNavBar key="payment" component={Payment} />
            <Scene hideNavBar key="notifications" component={Notifications} />
            <Scene hideNavBar key="userDetails" component={UserDetails} />
            <Scene hideNavBar key="creditCardq" component={CreditCardq} />
            <Scene hideNavBar key="saveCards" component={SaveCards} />
            <Scene hideNavBar key="paymentDetails" component={PaymentDetails} />
            <Scene hideNavBar key="paymentConfirm" component={PaymentConfirm} />
            <Scene hideNavBar key="receipt" component={Receipt} />
          </Scene>
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
  riderApproved: state.rider.user.isApproved,
  riderJwtAccessToken: state.rider.appState.jwtAccessToken
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
