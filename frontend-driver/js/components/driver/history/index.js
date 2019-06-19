import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { View, Platform, Dimensions } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  Card,
  CardItem,
  Title,
  Left,
  Right,
  Body,
  Spinner
} from "native-base";
import _ from "lodash";
import { Actions } from "react-native-router-flux";

import { fetchTripHistoryAsync } from "../../../actions/driver/history";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    trips: state.driver.history.trips,
    loadSpinner: state.driver.history.loadSpinner
  };
}

class History extends Component {
  static propTypes = {
    jwtAccessToken: PropTypes.string,
    trips: PropTypes.array,
    fetchTripHistoryAsync: PropTypes.func,
    loadSpinner: PropTypes.bool
  };

  async componentDidMount() {
    await this.props.fetchTripHistoryAsync(this.props.jwtAccessToken);
  }

  formatDate(bookingTime) {
    // eslint-disable-line class-methods-use-this
    return moment(bookingTime).format(" ddd Do MMM YYYY h:mm a");
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: commonColor.brandPrimary }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Trip History
            </Title>
          </Body>
          <Right />
        </Header>
        {this.props.loadSpinner ? (
          <Spinner style={{ flex: 1, alignItems: "center" }} />
        ) : (
          <Content style={{ backgroundColor: "#eee" }}>
            <View style={{ padding: 15 }}>
              {_.get(this.props, "trips.length") === 0 ? (
                <Text> You have not provided any a ride yet!! </Text>
              ) : (
                _.map(this.props.trips, (trip, index) => (
                  <View key={index} style={{ paddingBottom: 10 }}>
                    <Card
                      style={{
                        width: width - 30,
                        height: null,
                        borderRadius: 4,
                        justifyContent: "space-between",
                        flexDirection: "row"
                      }}
                    >
                      <CardItem style={styles.IconCardItem}>
                        <Thumbnail
                          source={{ uri: trip.rider.profileUrl }}
                          style={{ width: 80, height: 80, borderRadius: 40 }}
                        />

                        <Text style={{ color: "white", textAlign: "center" }}>
                          {trip.rider.fname}
                        </Text>
                      </CardItem>
                      <CardItem style={styles.addressCardItem}>
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingBottom: "7%"
                            }}
                          >
                            <Icon
                              active
                              name="pin"
                              style={{ ...styles.pinIcons, fontSize: 18 }}
                            />
                            <FAIcon
                              name="circle"
                              style={{ ...styles.pinIcons, fontSize: 3 }}
                            />
                            <FAIcon
                              name="circle"
                              style={{ ...styles.pinIcons, fontSize: 3 }}
                            />
                            <FAIcon
                              name="circle"
                              style={{ ...styles.pinIcons, fontSize: 3 }}
                            />
                            <FAIcon
                              name="circle"
                              style={{ ...styles.pinIcons, fontSize: 12 }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "space-between"
                            }}
                          >
                            <Text numberOfLines={2} style={styles.address}>
                              {trip.pickUpAddress}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{ ...styles.address, marginTop: 10 }}
                            >
                              {trip.destAddress}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Text style={styles.tripAmt}>${trip.tripAmt}</Text>
                          <View style={styles.devider} />
                          <Text style={styles.tripDate}>
                            {this.formatDate(trip.bookingTime)}
                          </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </View>
                ))
              )}
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    fetchTripHistoryAsync: jwtAccessToken =>
      dispatch(fetchTripHistoryAsync(jwtAccessToken))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(History);
