import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  Header,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Title,
  Thumbnail,
  Right,
  Left,
  Body,
  Grid,
  Col
} from "native-base";
import Communications from "react-native-communications";
import _ from "lodash";
import PropTypes from "prop-types";
import * as tripViewSelector from "../../../reducers/rider/tripRequest";
import { changePageStatus, currentLocation , clearTripAndTripRequest } from "../../../actions/rider/home";
import { cancelRide } from "../../../actions/rider/rideBooked";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const taxiIcon = require("../../../../assets/images/Taxi-Icon.jpg");

function mapStateToProps(state) {
  return {
    tripRequest: state.rider.tripRequest,
    trip: state.rider.trip,
    tripStatus: state.rider.trip.tripStatus,
    socketDisconnected: state.rider.appState.socketDisconnected,
    tripViewSelector: tripViewSelector.tripView(state)
  };
}
class RideBooked extends Component {
  static propTypes = {
    tripRequest: PropTypes.object,
    cancelRide: PropTypes.func,
    changePageStatus: PropTypes.func,
    socketDisconnected: PropTypes.bool,
    tripViewSelector: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      stars: [
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ]
    };
  }

  handlePress() {
    this.props.cancelRide();
    this.props.changePageStatus("home");
    this.props.clearTripAndTripRequest();
  }
  goBack() {
    this.props.changePageStatus("home");
  }
  driverRating() {
    return <View style={{ flexDirection: "row" }} />;
  }

  render() {
    return (
      <View pointerEvents="box-none" style={{ flex: 1 }}>
        <View style={styles.locateIcon}>
          <TouchableOpacity onPress={() => this.props.currentLocation()}>
            <Icon
              name="ios-locate"
              style={{ fontSize: 40, color: commonColor.brandPrimary, backgroundColor: 'transparent' }}
            />
          </TouchableOpacity>
        </View>
        {this.props.tripViewSelector.showFooter ? (
          <View style={styles.slideSelector}>
            <Card
              style={{ bottom: -5, borderBottomWidth: 1, borderColor: "#eee" }}
            >
              <CardItem>
                <Grid style={{ flexDirection: "row", borderWidth: 0 }}>
                  <Col style={styles.driverInfoContainer}>
                    <Thumbnail
                      size={70}
                      source={{
                        uri: _.get(
                          this.props,
                          "tripRequest.driver.profileUrl",
                          "profileImage"
                        )
                      }}
                      style={{
                        borderRadius: 28,
                        borderWidth: 1,
                        borderColor: "#EEE"
                      }}
                    />
                    <View style={styles.driverInfo}>
                      <View style={{ flexDirection: "row" }}>
                        {this.state.stars.map(
                          (item, index) =>
                            3 ? (
                              3 > index ? (
                                <Icon
                                  key={index}
                                  name="ios-star"
                                  style={{
                                    marginLeft: 0,
                                    marginRight: 3,
                                    fontSize: 15,
                                    width: null,
                                    color: commonColor.brandPrimary
                                  }}
                                />
                              ) : (
                                  <Icon
                                    key={index}
                                    name="ios-star-outline"
                                    style={{
                                      marginLeft: 0,
                                      width: null,
                                      marginRight: 3,
                                      fontSize: 15
                                    }}
                                  />
                                )
                            ) : null
                        )}
                      </View>
                    </View>
                    <Text>
                      {_.get(this.props, "tripRequest.driver.fname", "Rishabh")}
                    </Text>
                  </Col>
                  <Col style={styles.driverInfoContainer}>
                    <Thumbnail
                      size={40}
                      source={taxiIcon}
                      style={{
                        borderRadius: 28,
                        borderWidth: 1,
                        borderColor: "#eee"
                      }}
                    />
                    <View style={styles.carInfo}>
                      <Text style={{ fontSize: 12, lineHeight: 13 }}>
                        {_.get(
                          this.props,
                          "tripRequest.driver.carDetails.regNo",
                          "NYC 603"
                        )}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, lineHeight: 15 }}>
                      {_.get(
                        this.props,
                        "tripRequest.driver.carDetails.company",
                        "Audi"
                      )}
                    </Text>
                  </Col>
                </Grid>
              </CardItem>
            </Card>
            <View style={{ flexDirection: "row", height: 50 }}>
              <Button
                block
                style={{ ...styles.card, backgroundColor: "#084069" }}
                onPress={() =>
                  Communications.phonecall(
                    _.get(this.props, "tripRequest.driver.phoneNo", ""),
                    true
                  )
                }
              >
                <Text style={styles.btnText}>Contact</Text>
              </Button>
              {this.props.tripViewSelector.cancelButton ? (
                <Button
                  block
                  style={{ ...styles.card, backgroundColor: "#fff" }}
                  onPress={() => this.handlePress()}
                >
                  <Text style={{ ...styles.btnText, color: "#FF8A65" }}>
                    Cancel
                  </Text>
                </Button>
              ) : (
                  <View />
                )}
            </View>
            {/* <Text style={styles.waitTime}>
                PICKUP TIME IS APPROXIMATELY 2 MINUTES
              </Text> */}
          </View>
        ) : (
            <View />
          )}

        <View style={styles.headerContainer}>
          <Header
            androidStatusBarColor={commonColor.statusBarLight}
            style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
          >
            {this.props.tripViewSelector.backButton ? (
              <Left>
                <Button transparent onPress={() => this.goBack()}>
                  <Icon
                    name="md-arrow-back"
                    style={{ fontSize: 28, color: commonColor.brandPrimary }}
                  />
                </Button>
              </Left>
            ) : (
                <Left />
              )}
            <Body>
              <Title style={{ color: commonColor.brandPrimary }}>
                {_.get(this.props.tripViewSelector, "heading", "On Trip")}
              </Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.srcdes}>
            <Card style={styles.searchBar}>
              <CardItem style={{ borderWidth: 0, borderColor: "transparent" }}>
                <Text style={styles.confirmation}>
                  {_.get(
                    this.props.tripViewSelector,
                    "subText",
                    "You are on way to reach Destination"
                  )}
                </Text>
              </CardItem>
            </Card>
          </View>
        </View>
        {/*<Modal
          animationType={"none"}
          transparent
          visible={this.props.socketDisconnected}
        >
          <View style={styles.modalTopContainer}>
            <View style={styles.modalTextViewContainer}>
              <Text style={styles.modalText}>
                Internet is disconnected at the moment
              </Text>
            </View>
          </View>
      </Modal>*/}
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    cancelRide: () => dispatch(cancelRide()),
    currentLocation: () => dispatch(currentLocation()),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    clearTripAndTripRequest: () => dispatch(clearTripAndTripRequest())
  };
}

export default connect(mapStateToProps, bindActions)(RideBooked);
