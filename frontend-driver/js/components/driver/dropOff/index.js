import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions, TouchableOpacity } from "react-native";
import SLIcon from "react-native-vector-icons/SimpleLineIcons";
import {
  Header,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Title,
  Left,
  Right,
  Body
} from "native-base";
import _ from "lodash";
import PropTypes from "prop-types";
import { endTrip } from "../../../actions/driver/dropOff";
import styles from "./styles";
import FAIcon from "react-native-vector-icons/FontAwesome";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import navigate from "../../../utils/navigate";

const deviceWidth = Dimensions.get("window").width;

function mapStateToProps(state) {
  return {
    trip: state.driver.trip,
    region: {
      latitude: state.driver.user.gpsLoc[1],
      longitude: state.driver.user.gpsLoc[0],
      latitudeDelta: state.driver.tripRequest.latitudeDelta,
      longitudeDelta: state.driver.tripRequest.longitudeDelta
    },
    latitude: state.driver.tripRequest.srcLoc[1],
    longitude: state.driver.tripRequest.srcLoc[0],
    destLocLat: state.driver.tripRequest.destLoc[0],
    destLocLng: state.driver.tripRequest.destLoc[1]
  };
}
class DropOff extends Component {
  static propTypes = {
    trip: PropTypes.object,
    endTrip: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      stars: [
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ],
      navigateData: {
        source: {
          latitude: _.get(this.props, "region.latitude", ""),
          longitude: _.get(this.props, "region.longitude", "")
        },
        destination: {
          latitude: _.get(this.props, "destLocLng", ""),
          longitude: _.get(this.props, "destLocLat", "")
        },
        params: [
          {
            key: "dirflg"
          }
        ]
      }
    };
  }
  rate(index) {
    const stateCopy = { ...this.state };
    for (let i = 0; i < 5; i += 1) {
      stateCopy.stars[i].active = false;
    }
    this.setState(stateCopy);
    for (let i = index; i >= 0; i -= 1) {
      stateCopy.stars[i].active = true;
    }
    this.setState(stateCopy);
  }
  completeTrip() {
    this.props.endTrip();
  }
  render() {
    console.log(this.state.navigateData,"dropOff")
    return (
      <View pointerEvents="box-none" style={{ flex: 1, position: "relative" }}>
        <Button full style={styles.tripBtn} onPress={() => this.completeTrip()}>
          <Text style={styles.btnText}>Complete Trip</Text>
        </Button>

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
                Destination Arrived
              </Title>
            </Body>
            <Right />
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
                  {_.get(this.props.trip, "destAddress", "")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    endTrip: () => dispatch(endTrip())
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(DropOff);
