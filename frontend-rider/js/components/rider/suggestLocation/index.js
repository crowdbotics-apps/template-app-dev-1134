import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, TouchableOpacity } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  Header,
  Text,
  Button,
  Icon,
  Card,
  Title,
  Item,
  Input,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Grid,
  Col,
  Row
} from "native-base";
import { Actions } from "react-native-router-flux";

import { openDrawer } from "../../../actions/drawer";
import * as viewSelector from "../../../reducers/viewStore";
import { fetchPrediction, changeRegion } from "../../../actions/rider/home";
import {
  setSrcAddress,
  setDestAddress,
  fetchCoordinatesFromAddress,
  fetchCoordinatesFromAddressAsync,
  fetchFareDetail
} from "../../../actions/rider/confirmRide";
import {
  setHomeAddress,
  setWorkAddress
} from "../../../actions/rider/settings";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
function mapStateToProps(state) {
  return {
    region: {
      longitude: state.rider.user.gpsLoc[0],
      latitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    tripRequest: state.rider.tripRequest,
    predictionArray: state.viewStore.predictionArray,
    homeAddress: state.rider.user.homeAddress,
    workAddress: state.rider.user.workAddress
  };
}
class SuggestLocation extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    fetchPrediction: PropTypes.func,
    predictionArray: PropTypes.array,
    currentLocation: PropTypes.func,
    fetchFareDetail: PropTypes.func,
    pickupButtonVisibility: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      string: "",
      currentLatitude: "",
      currentLongitude: "",
      modalStatus: false
    };
  }
  _append(text) {
    this.setState({
      string: text
    });
    this.props.fetchPrediction(text); //DDT suggestion
  }
  setAddress(fetchedAddress) {
    if (this.props.page === "home") {
      this.props.setSrcAddress(fetchedAddress);
      this.props.fetchCoordinatesFromAddressAsync(fetchedAddress);
      if (!this.props.tripRequest.destLoc.length) {
        this.props.fetchFareDetail(this.props.tripRequest);
      }
    }
    if (this.props.page === "destination") {
      this.props.setDestAddress(fetchedAddress);
      this.props.fetchCoordinatesFromAddress(fetchedAddress);
      this.props.fetchFareDetail(this.props.tripRequest);
    }

    if (this.props.page === "HomeAddress") {
      this.props.setHomeAddress(fetchedAddress);
    }

    if (this.props.page === "WorkAddress") {
      this.props.setWorkAddress(fetchedAddress);
    }
    Actions.pop({
      address: fetchedAddress
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.string.length !== 0 ? (
          <View style={{margin:14,marginTop:Platform.OS === "ios" ? 148 : 106}}>
            <List style={{ backgroundColor: "white" }}>
              {this.props.predictionArray.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onPress={() => this.setAddress(item.description)}
                >
                  <Text style={{ fontSize: 14 }}>{item.description}</Text>
                </ListItem>
              ))}
            </List>
          </View>
        ) : (
          <View style={{ margin: 14,marginTop:Platform.OS === "ios" ? 148 : 106}}>
            {this.props.page === "HomeAddress" ||
            this.props.page === "WorkAddress" ? null : (
              <List style={{ backgroundColor: "white" }}>
                {this.props.homeAddress !== null ? (
                  <ListItem
                    button
                    onPress={() => this.setAddress(this.props.homeAddress)}
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Icon name="ios-home" style={{ fontSize: 30 }} />
                      <View
                        style={{
                          marginLeft: 15,
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          Home
                        </Text>
                        <Text style={{ fontSize: 14, alignSelf: "flex-start" }}>
                          {this.props.homeAddress}
                        </Text>
                      </View>
                    </View>
                  </ListItem>
                ) : null}
                {this.props.workAddress !== null ? (
                  <ListItem
                    button
                    onPress={() => this.setAddress(this.props.workAddress)}
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Icon name="ios-briefcase" style={{ fontSize: 30 }} />
                      <View
                        style={{
                          marginLeft: 15,
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          Work
                        </Text>
                        <Text style={{ fontSize: 14, alignSelf: "flex-start" }}>
                          {this.props.workAddress}
                        </Text>
                      </View>
                    </View>
                  </ListItem>
                ) : null}
              </List>
            )}
          </View>
        )}
        <View style={styles.headerContainer} pointerEvents="box-none">
          <Header
            iosStatusbar="light-content"
            style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
            androidStatusBarColor={commonColor.statusBarLight}
          >
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon
                  name="md-arrow-back"
                  style={{ fontSize: 28, color: commonColor.brandPrimary }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 2 }}>
              <Title
                style={{
                  color: commonColor.brandPrimary,
                  marginTop: -2
                }}
              >
                {_.get(this.props, "heading", "Search Location")}
              </Title>
            </Body>
            <Right />
          </Header>
          <Card
            style={
              Platform.OS === "ios" ? styles.iosSearchBar : styles.aSearchBar
            }
          >
            <Grid>
              <Col size={1} style={{ padding: 15 }}>
                <TouchableOpacity onPress={() => this.focusSearch()}>
                  <Icon name="ios-search" style={{ fontSize: 20 }} />
                </TouchableOpacity>
              </Col>
              <Col
                size={4}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: -120
                }}
              >
                <Row
                  style={
                    Platform.OS === "android"
                      ? { marginTop: -20, left: -10 }
                      : { marginTop: -30, padding: 5, left: -10 }
                  }
                >
                  <Item
                    regular
                    style={
                      Platform.OS === "android"
                        ? {
                            flex: 1,
                            alignItems: "center",
                            borderColor: "transparent",
                            paddingBottom: 5
                          }
                        : {
                            flex: 1,
                            alignItems: "center",
                            borderColor: "transparent"
                          }
                    }
                  >
                    <Input
                      ref="searchInput"
                      placeholder="Search for locality or place"
                      autoFocus
                      onChangeText={text => this._append(text)}
                      value={this.state.string}
                      placeholderTextColor={commonColor.lightThemePlaceholder}
                      style={{
                        top: 15,
                        fontSize: 15,
                        paddingLeft: 50
                      }}
                    />
                  </Item>
                </Row>
              </Col>
            </Grid>
          </Card>
        </View>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    changeRegion: region => dispatch(changeRegion(region)),
    fetchPrediction: string => dispatch(fetchPrediction(string)),
    fetchCoordinatesFromAddressAsync: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddressAsync(fetchedAddress)),
    fetchCoordinatesFromAddress: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddress(fetchedAddress)),
    setSrcAddress: fetchedAddress => dispatch(setSrcAddress(fetchedAddress)),
    setDestAddress: fetchedAddress => dispatch(setDestAddress(fetchedAddress)),
    setHomeAddress: homeAddress => dispatch(setHomeAddress(homeAddress)),
    setWorkAddress: workAddress => dispatch(setWorkAddress(workAddress)),
    fetchFareDetail: tripRequest => dispatch(fetchFareDetail(tripRequest))
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(SuggestLocation);
