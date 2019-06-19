import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions
} from "react-native";
import Communications from "react-native-communications";
import _ from "lodash";
import PropTypes from "prop-types";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {
  Header,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Title,
  Left,
  Right,
  Body,
  Container,
  Col
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import { startRide } from "../../../actions/driver/startRide";
import { clearReducerState } from "../../../actions/driver/rateRider";
import { cancelledRideByDriver } from "../../../actions/driver/pickRider";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import navigate from "../../../utils/navigate";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

function mapStateToProps(state) {
  return {
    tripRequest: state.driver.tripRequest,
    trip: state.driver.trip,
    region: {
      latitude: state.driver.tripRequest.srcLoc[1],
      longitude: state.driver.tripRequest.srcLoc[0],
      latitudeDelta: state.driver.tripRequest.latitudeDelta,
      longitudeDelta: state.driver.tripRequest.longitudeDelta
    },
    driverCurrentGpsLocLat: state.driver.user.gpsLoc[1],
    driverCurrentGpsLocLong: state.driver.user.gpsLoc[0],
    socketDisconnected: state.driver.appState.socketDisconnected
  };
}
class StartRide extends Component {
  static propTypes = {
    region: PropTypes.object,
    tripRequest: PropTypes.object,
    socketDisconnected: PropTypes.bool,
    startRide: PropTypes.func,
    clearReducerState: PropTypes.func,
    cancelledRideByDriver: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      heading: "RIDER LOCATION ARRIVED",
      showView: true,
      driver: {
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude
      },
      modalVisible: false,
      navigateData: {
        source: {
          latitude: _.get(this.props, "region.latitude", ""),
          longitude: _.get(this.props, "region.longitude", "")
        },
        destination: {
          latitude: _.get(this.props, "driverCurrentGpsLocLat", ""),
          longitude: _.get(this.props, "driverCurrentGpsLocLong", "")
        },
        params: [
          {
            key: "dirflg"
          }
        ]
      }
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  startRide() {
    this.props.startRide();
  }
  goBack() {
    this.props.clearReducerState();
  }
  cancelRide() {
    this.setModalVisible(false);
    this.props.cancelledRideByDriver();
  }
  render() {
    console.log(this.state.navigateData, "this.state.navigateData startRide")
    return (
      <View pointerEvents="box-none" style={{ flex: 1 }}>
        {this.state.showView ? (
          <View style={styles.slideSelector}>
            <Card style={{ marginBottom: -5 }}>
              <CardItem style={styles.pickCard}>
                <Left>
                  <Icon name="ios-person" style={styles.profileIcon} />
                  <Body>
                    <Text
                      style={{
                        color: "green",
                        fontSize: 13,
                        fontWeight: "700",
                        lineHeight: 14
                      }}
                    >
                      PICK UP
                    </Text>
                    <Text note style={{ fontSize: 18, fontWeight: "500" }}>
                      {_.get(this.props.tripRequest.rider, "fname", "Rider")}
                    </Text>
                  </Body>
                </Left>
                <Right
                  style={{
                    justifyContent: "center",
                    position: "absolute",
                    right: 10,
                    top: 0,
                    bottom: 0
                  }}
                >
                  <Text style={{ textAlign: "right" }}>0 MIN</Text>
                </Right>
              </CardItem>
            </Card>
            <Card style={{ margin: 0 }}>
              <CardItem style={{ alignSelf: "center", borderBottomWidth: 0 }}>
                <Left
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 70
                  }}
                >
                  <Icon name="md-alarm" />
                  <Body>
                    <Text style={{ color: "#555", fontWeight: "700" }}>
                      WAIT FOR RIDER
                    </Text>
                    <Text note>Rider has been notified</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ borderTopWidth: 1 }}>
                <Button
                  onPress={() => this.startRide()}
                  block
                  style={styles.tripBtn}
                >
                  <Text style={styles.btnText}>START TRIP</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        ) : (
          <View />
        )}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <Container style={{ backgroundColor: commonColor.brandPrimary }}>
            <Header
              iosBarStyle="light-content"
              style={{
                ...(Platform.OS === "ios" ? {} : styles.modalHeader),
                backgroundColor: "#2E6894",
                borderBottomWidth: 0
              }}
              androidStatusBarColor={commonColor.statusBarColorDark}
            >
              <Left>
                <Button
                  transparent
                  style={{ justifyContent: "center" }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Icon name="ios-close" style={styles.close} />
                </Button>
              </Left>
              <Body>
                <Title
                  style={
                    Platform.OS === "ios" ? styles.iosTitle : styles.aTitle
                  }
                >
                  Current Trip
                </Title>
              </Body>
              <Right>
                {/*<Button transparent>
                  <Text
                    style={
                      Platform.OS === "ios"
                        ? styles.iosHeaderText
                        : styles.aHeaderText
                    }
                  >
                    WAYBILL
                  </Text>
                </Button>*/}
              </Right>
            </Header>
            <Content style={styles.modalContainer}>
              <View
                style={{
                  marginTop: 60,
                  marginLeft: 30,
                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}
              >
                <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
                  <View
                    style={{
                      height: deviceHeight - 250,
                      width: 3,
                      left: 9.5,
                      borderWidth: 1,
                      backgroundColor: "#fff"
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginVertical: 20,
                    alignItems: "stretch"
                  }}
                >
                  <View style={{ flexDirection: "row", marginTop: -30 }}>
                    <View
                      style={{ ...styles.circleBorder, borderColor: "#00C5DE" }}
                    >
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: "#00C5DE"
                        }}
                      />
                    </View>
                    <Text style={{ color: "white", fontSize: 13, left: 30 }}>
                      Your Trip Detail
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ ...styles.circleBorder, borderColor: "white" }}
                    >
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: "white"
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                        paddingLeft: 20,
                        position: "absolute",
                        top: -35,
                        left: 30
                      }}
                    >
                      <Text style={{ color: "white" }}>PickUp Location</Text>
                      <Card
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 4,
                          width: deviceWidth / 2 + 40
                        }}
                      >
                        <CardItem
                          style={{
                            ...styles.CardItem,
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4
                          }}
                        >
                          <Col size={1}>
                            <View
                              style={{
                                backgroundColor: "#B1BEC6",
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 0
                              }}
                            >
                              <FAIcon
                                style={{
                                  color: "#fff",
                                  fontSize: 25,
                                  paddingRight: 0
                                }}
                                name="user"
                              />
                            </View>
                          </Col>
                          <Col size={3} style={{ marginLeft: 5 }}>
                            <Text style={{ color: "#95E6ED" }}>Pickup</Text>
                            <Text style={{ ...styles.cardtext, fontSize: 12 }}>
                              {_.get(this.props.tripRequest.rider, "fname", "")}
                            </Text>
                          </Col>
                          <Icon
                            name="ios-car"
                            style={{
                              fontSize: 30,
                              width: null,
                              color: "#B9B2B3",
                              position: "absolute",
                              top: 0,
                              right: 3
                            }}
                          />
                        </CardItem>
                        <CardItem
                          style={{
                            ...styles.CardItem,
                            marginLeft: 5,
                            marginRight: 5,
                            flexDirection: "row",
                            borderTopWidth: 1,
                            borderTopColor: "#B9B2B3"
                          }}
                        >
                          <Icon
                            name="ios-pin"
                            style={{ color: "#2C7BB5", flex: 1 }}
                          />
                          <Text
                            numberOfLines={2}
                            style={{ fontSize: 12, flex: 4, color: "#4F5354" }}
                          >
                            {_.get(this.props.tripRequest, "pickUpAddress", "")}
                          </Text>
                        </CardItem>
                      </Card>
                      <View style={{ ...styles.triangle, top: 32 }} />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        ...styles.circleBorder,
                        borderColor: "transparent"
                      }}
                    >
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: "#fff"
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ ...styles.circleBorder, borderColor: "#FF535A" }}
                    >
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: "#FF535A"
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                        paddingLeft: 20,
                        position: "absolute",
                        top: -35,
                        left: 30
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        Destination Location
                      </Text>
                      <Card
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 4,
                          width: deviceWidth / 2 + 40
                        }}
                      >
                        <CardItem
                          style={{
                            ...styles.CardItem,
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4
                          }}
                        >
                          <Col size={1}>
                            <View
                              style={{
                                backgroundColor: "#B1BEC6",
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 0
                              }}
                            >
                              <FAIcon
                                style={{
                                  color: "#fff",
                                  fontSize: 25,
                                  paddingRight: 0
                                }}
                                name="user"
                              />
                            </View>
                          </Col>
                          <Col size={3} style={{ marginLeft: 5 }}>
                            <Text style={{ color: "#FFA4A7" }}>Drop Off</Text>
                            <Text style={{ ...styles.cardtext, fontSize: 12 }}>
                              {_.get(this.props.tripRequest.rider, "fname", "")}
                            </Text>
                          </Col>
                          <Icon
                            name="ios-car"
                            style={{
                              fontSize: 30,
                              width: null,
                              color: "#B9B2B3",
                              position: "absolute",
                              top: 0,
                              right: 3
                            }}
                          />
                        </CardItem>
                        <CardItem
                          style={{
                            ...styles.CardItem,
                            marginLeft: 5,
                            marginRight: 5,
                            flexDirection: "row",
                            borderTopWidth: 1,
                            borderTopColor: "#B9B2B3"
                          }}
                        >
                          <Icon
                            name="ios-pin"
                            style={{ flex: 1, color: "#2C7BB5" }}
                          />
                          <Text
                            numberOfLines={2}
                            style={{ flex: 4, fontSize: 12, color: "#4F5354" }}
                          >
                            {_.get(this.props.tripRequest, "destAddress", "")}
                          </Text>
                        </CardItem>
                      </Card>
                      <View style={styles.triangle} />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: -10 }}>
                    <View
                      style={{
                        ...styles.circleBorder,
                        borderColor: "transparent"
                      }}
                    >
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: "#fff"
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Content>
            <View style={{ flexDirection: "row", height: 50 }}>
              <Button
                block
                style={{ ...styles.card, backgroundColor: "#FF8A65" }}
                onPress={() =>
                  Communications.phonecall(
                    _.get(this.props.tripRequest.rider, "phoneNo", ""),
                    true
                  )
                }
              >
                <Text style={styles.btnText}>Contact</Text>
              </Button>

              <Button
                block
                style={{ ...styles.card, backgroundColor: "#fff" }}
                onPress={() => this.cancelRide()}
              >
                <Text style={{ ...styles.btnText, color: "#FF8A65" }}>
                  Cancel
                </Text>
              </Button>
            </View>
          </Container>
        </Modal>
        <View style={styles.headerContainer}>
          <Header
            iosBarStyle="light-content"
            style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
            androidStatusBarColor={commonColor.statusBarColorDark}
          >
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 4 }}>
              <Title
                style={
                  Platform.OS === "ios"
                    ? styles.iosHeaderTitle
                    : styles.aHeaderTitle
                }
              >
                {this.state.heading}
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Icon name="ios-list" style={{ color: "#fff" }} />
              </Button>
            </Right>
          </Header>
          <View
            style={Platform.OS === "ios" ? styles.iosSrcdes : styles.aSrcdes}
          >
            <View style={styles.searchBar}>
              <TouchableOpacity
                style={styles.navigateBtn}
                onPress={() => {
                  navigate(this.state.navigateData);
                }}
              >
                <Icon name="md-navigate" style={{ fontSize: 24 }} />
                <Text
                  style={{ fontSize: 13, fontWeight: "700", lineHeight: 14 }}
                >
                  Navigate
                </Text>
              </TouchableOpacity>
              <View style={styles.place}>
                <Text style={styles.placeText}>
                  {_.get(this.props.tripRequest, "pickUpAddress", "")}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Modal
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
        </Modal>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    startRide: () => dispatch(startRide()),
    clearReducerState: () => dispatch(clearReducerState()),
    cancelledRideByDriver: () => dispatch(cancelledRideByDriver())
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(StartRide);
