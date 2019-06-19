import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, Alert } from "react-native";
import PropTypes from "prop-types";
import {
  Header,
  Text,
  Button,
  Grid,
  Col,
  Icon,
  Card,
  CardItem,
  Input,
  Title,
  Item,
  Left,
  Right,
  Body
} from "native-base";
import _ from "lodash";
import Spinner from "../../loaders/Spinner";
import { Actions } from "react-native-router-flux";
import { openDrawer } from "../../../actions/drawer";
import * as tripViewSelector from "../../../reducers/rider/tripRequest";
import {
  changePageStatus,
  clearTripAndTripRequest,
  currentLocation
} from "../../../actions/rider/home";
import {
  fetchAddressFromCoordinatesAsync,
  fetchFareDetail,
  setTripRequest,
  clearFare,
  clearDestAddress
} from "../../../actions/rider/confirmRide";
import { requestTrip } from "../../../services/ridersocket";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../../common/ModalView";

const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.tripRequest.srcLoc[1],
      longitude: state.rider.tripRequest.srcLoc[0]
    },
    isConnected: state.network.isConnected,
    tripRequest: state.rider.tripRequest,
    srcLoc: state.rider.tripRequest.srcLoc,
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    destAddress: state.rider.tripRequest.destAddress,
    currentAddress: state.rider.user.address,
    rider: state.rider.user,
    destLoc: state.rider.tripRequest.destLoc,
    tripRequestStatus: state.rider.tripRequest.tripRequestStatus,
    tripViewSelector: tripViewSelector.tripView(state),
    paymentOption: state.rider.paymentOption,
    appConfig: state.basicAppConfig.config
  };
}

class ConfirmRide extends Component {
  static propTypes = {
    region: PropTypes.object,
    tripRequest: PropTypes.object,
    pickUpAddress: PropTypes.string,
    rider: PropTypes.object,
    changePageStatus: PropTypes.func,
    clearTripAndTripRequest: PropTypes.func,
    setTripRequest: PropTypes.func,
    fetchAddressFromCoordinatesAsync: PropTypes.func,
    tripViewSelector: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      showFareEstimate: false,
      srcCity: "",
      destCity: this.props.destAddress
    };
  }

  async componentDidMount() {
    // await this.props.fetchAddressFromCoordinatesAsync(
    //   this.props.region.latitude,
    //   this.props.region.longitude
    // );
    // this.props.clearFare();
  }

  async handlePress() {
    // this.props.clearTripAndTripRequest(); // To make sure any previous trip is not present.
    this.props.setTripRequest("request");
    this.props.tripRequest.paymentMode = this.props.paymentOption.paymentMethod;
    //DDT
    requestTrip({
      // callingSocket
      tripRequest: this.props.tripRequest,
      rider: this.props.rider
    });
  }
  fetchTripEstimate() {
    if (this.props.tripRequest.destAddress) {
      this.props.fetchFareDetail(this.props.tripRequest);
      this.setState({ showFareEstimate: true });
    } else {
      Alert.alert("Warning", "Set Up Destination Location");
    }
  }
  fareEstimate() {
    return (
      <ModalView>
        {this.props.tripRequest.tripAmt ||
        this.props.tripRequest.tripDistance ? (
          <View
            style={{
              backgroundColor: "transparent",
              padding: 20,
              height: deviceHeight / 2
            }}
          >
            <Card
              style={{
                width: width - 30,
                height: null,
                borderRadius: 4,
                justifyContent: "space-between"
              }}
            >
              <CardItem
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#EFEDED"
                }}
              >
                <Body
                  style={{
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#727376"
                    }}
                  >
                    ESTIMATED FARE
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Grid style={{ paddingHorizontal: 15, marginTop: -15 }}>
                  <Col
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      active
                      name="pin"
                      style={{ color: "#3996C8", fontSize: 40 }}
                    />
                    <Text style={{ color: "#ADADAD", fontSize: 18 }}>
                      Distance
                    </Text>
                    <Text style={{ color: "#3996C8", fontWeight: "bold" }}>
                      {this.props.tripRequest.tripDistance}
                    </Text>
                  </Col>
                  <Col
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      name="time"
                      style={{ color: "#3996C8", fontSize: 40 }}
                    />
                    <Text style={{ color: "#ADADAD", fontSize: 18 }}>Time</Text>
                    <Text style={{ color: "#3996C8", fontWeight: "bold" }}>
                      {this.props.tripRequest.tripTime}
                    </Text>
                  </Col>
                  <Col
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#3996C8",
                        fontSize: 40,
                        fontWeight: "bold"
                      }}
                    >
                      {_.get(
                        this.props.appConfig,
                        "tripPrice.currencySymbol",
                        "$"
                      )}
                    </Text>
                    <Text style={{ color: "#ADADAD", fontSize: 18 }}>Fare</Text>
                    <Text style={{ color: "#3996C8", fontWeight: "bold" }}>
                      {this.props.appConfig.tripPrice.currencySymbol}
                      {this.props.tripRequest.tripAmt}
                    </Text>
                  </Col>
                </Grid>
              </CardItem>
              <Button
                full
                info
                onPress={() => {
                  this.setState({ showFareEstimate: false });
                }}
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  GOT IT
                </Text>
              </Button>
            </Card>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "transparent",
              padding: 20,
              height: deviceHeight / 3
            }}
          >
            <Card
              style={{
                width: width - 30,
                height: null,
                borderRadius: 4,
                justifyContent: "space-between"
              }}
            >
              <CardItem
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  No Possible Route
                </Text>
              </CardItem>
              <Button
                full
                info
                onPress={() => {
                  this.setState({ showFareEstimate: false });
                }}
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  GOT IT
                </Text>
              </Button>
            </Card>
          </View>
        )}
      </ModalView>
    );
  }
  goBack() {
    this.props.changePageStatus("home");
    this.props.clearDestAddress();
    this.props.clearTripAndTripRequest();
    // this.props.clearFare();
  }

  render() {console.log(this.props.destAddress ,
    this.props.pickUpAddress,"Confirmed Booking")
    console.log("inside ConfirmBooking")
    
    return (
      <View pointerEvents="box-none" style={{ flex: 1 }}>
        {this.state.showFareEstimate ? this.fareEstimate() : null}
        <View style={{ position: "absolute", top: 0, width: width + 5 }}>
          <Header
            androidStatusBarColor={commonColor.statusBarLight}
            style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
          >
            {!this.props.tripViewSelector.backButton ? (
              <Left>
                <Button transparent onPress={() => this.goBack()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: commonColor.brandPrimary }}
                  />
                </Button>
              </Left>
            ) : (
              <View />
            )}
            <Body>
              <Title style={{ color: commonColor.brandPrimary }}>
                Confirmation
              </Title>
            </Body>
            <Right />
          </Header>

          <View
            style={Platform.OS === "ios" ? styles.iosSrcdes : styles.aSrcdes}
          >
            <Card
              style={
                Platform.OS === "ios" ? styles.iosSearchBar : styles.aSearchBar
              }
            >
              <Text
                style={{
                  ...styles.SearchPickText
                  // fontWeight: "bold"
                }}
              >
                Pickup Location
              </Text>
              <Input
                ref="searchInput"
                placeholder="Enter Pickup Location"
                maxLength={Platform.OS === "ios" ? null : 45}
                height={30}
                value={
                  this.props.pickUpAddress
                    ? _.get(this.props, "pickUpAddress", "")
                    : _.get(this.props, "currentAddress", "")
                }
                editable={false}
                placeholderTextColor={commonColor.lightThemePlaceholder}
                style={{
                  flex: 1,
                  fontSize: 13,
                  height: 30,
                  lineHeight: 10
                  // paddingBottom: 5
                }}
              />
            </Card>
            <View style={styles.searchBar}>
              <View>
                <Item
                  regular
                  style={{
                    backgroundColor: "#FFF",
                    marginLeft: 0,
                    borderColor: "transparent",
                    borderRadius: 10
                  }}
                >
                  <Icon name="ios-search" style={styles.searchIcon} />
                  <Button
                    onPress={() => {
                      Actions.suggestLocation({
                        heading: "Destination Location",
                        page: "destination"
                      });
                    }}
                    transparent
                    style={{ flex: 1, paddingLeft: 0 }}
                  >
                    {this.props.destAddress !== "" ? (
                      <Text multiline={Platform.OS !== "ios"} numberOfLines={1}>
                        {_.get(
                          this.props,
                          "destAddress",
                          "Enter Drop Location"
                        )}
                      </Text>
                    ) : (
                      <Text multiline={Platform.OS !== "ios"} numberOfLines={1}>
                        Enter Drop Location
                      </Text>
                    )}
                  </Button>
                </Item>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.slideSelector}>
          <Card style={{ flexDirection: "row", bottom: -6, left: -3 }}>
            <CardItem
              style={styles.selectCardContainer}
              button
              onPress={() => this.fetchTripEstimate()}
            >
              <View style={{ ...styles.selectCard, flexDirection: "row" }}>
                <Icon
                  name="md-alarm"
                  style={{
                    top: 5,
                    color: "#7FBFE2",
                    width: null,
                    fontSize: 20,
                    marginRight: 5
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#2E6894",
                    fontWeight: "600",
                    height: 25,
                    lineHeight: 26,
                    top: 5
                  }}
                >
                  TRIP ESTIMATE
                </Text>
              </View>
            </CardItem>
            <CardItem
              style={styles.selectCardContainer}
              button
              onPress={() => Actions.cardPayment()}
            >
              <View style={{ ...styles.selectCard, flexDirection: "row" }}>
                {this.props.paymentOption.ridePayment ? (
                  <Icon
                    name={
                      this.props.paymentOption.paymentMethod === "CARD"
                        ? "ios-card"
                        : "ios-cash"
                    }
                    style={styles.iosIcon}
                  />
                ) : (
                  <Icon name="ios-cash" style={styles.iosIcon} />
                )}
                <Text
                  style={{
                    fontSize: 14,
                    height: 25,
                    fontWeight: "600",
                    lineHeight: 26,
                    top: 5
                  }}
                >
                  {this.props.paymentOption.paymentMethod}
                </Text>
              </View>
            </CardItem>
          </Card>
          <Button
            full
            onPress={() => this.handlePress("rideBooked")}
            disabled={
              !(
                // this.props.isConnected &&
                this.props.destAddress &&
                this.props.pickUpAddress
              )
            }
            style={{ elevation: 0, paddingTop: 10, paddingBottom: 10 }}
          >
            {this.props.tripViewSelector.loadSpinner ? (
              <Spinner />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "500", fontSize: 20 }}>
                Request Taxi
              </Text>
            )}
          </Button>
        </View>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchAddressFromCoordinatesAsync: (latitude, longitude) =>
      dispatch(fetchAddressFromCoordinatesAsync(latitude, longitude)),
    currentLocation: () => dispatch(currentLocation()),
    setTripRequest: status => dispatch(setTripRequest(status)),
    clearTripAndTripRequest: () => dispatch(clearTripAndTripRequest()),
    fetchFareDetail: tripCoordinates =>
      dispatch(fetchFareDetail(tripCoordinates)),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    clearDestAddress: () => dispatch(clearDestAddress()),
    clearFare: () => dispatch(clearFare())
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(ConfirmRide);
