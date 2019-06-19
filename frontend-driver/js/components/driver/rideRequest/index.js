import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, ImageBackground } from "react-native";
import { Text, Header, Button, Title, Grid, Col, Container } from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import { changePageStatus } from "../../../actions/driver/home";
import { responseByDriver } from "../../../actions/driver/rideRequest";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const image = require("../../../../assets/images/map-bg.png");

function mapStateToProps(state) {
  return {
    tripRequest: state.driver.tripRequest,
    region: {
      latitude: state.driver.tripRequest.srcLoc[1],
      longitude: state.driver.tripRequest.srcLoc[0],
      latitudeDelta: state.driver.tripRequest.latitudeDelta,
      longitudeDelta: state.driver.tripRequest.longitudeDelta
    }
  };
}
class RideRequest extends Component {
  static propTypes = {
    responseByDriver: PropTypes.func,
    tripRequest: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sec: 10
    };
  }
  componentDidMount() {
    let interValID = setInterval(() => {
      this.setState({
        sec: this.state.sec - 1
      });
      if (this.state.sec < 0) {
        this.setState({
          sec: 0
        });
      }
    }, 1000);
    this.setState({
      interValID
    });
  }
  componentWillUnmount() {
    this.setState({
      sec: 0
    });
    clearInterval(this.state.interValID);
  }

  acceptRide() {
    this.props.responseByDriver("accept");
  }
  rejectRide() {
    this.props.responseByDriver("reject");
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
          iosBarStyle="light-content"
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Rider Notification
            </Title>
          </View>
        </Header>
        <View style={{ flex: 1 }} pointerEvents="box-none">
          <ImageBackground source={image} style={styles.mapBg}>
            <View style={styles.detailsContainer}>
              <Text style={styles.time}>{this.state.sec} Seconds</Text>
              <Text style={styles.place}>
                {_.get(this.props.tripRequest, "pickUpAddress", "")}
              </Text>
              <Grid
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Col>
                  <Button
                    block
                    style={{
                      paddingHorizontal: 15,
                      backgroundColor: "#04C2DA",
                      margin: 15
                    }}
                    onPress={() => this.acceptRide()}
                  >
                    <Text>Accept</Text>
                  </Button>
                </Col>
                <Col>
                  <Button
                    block
                    style={{
                      paddingHorizontal: 15,
                      backgroundColor: "red",
                      margin: 15
                    }}
                    onPress={() => this.rejectRide()}
                  >
                    <Text>Reject</Text>
                  </Button>
                </Col>
              </Grid>
            </View>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}
function bindActions(dispatch) {
  return {
    responseByDriver: response => dispatch(responseByDriver(response)),
    changePageStatus: newPage => dispatch(changePageStatus(newPage))
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(RideRequest);
