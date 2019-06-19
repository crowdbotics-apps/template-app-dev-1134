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
import { Actions, ActionConst } from "react-native-router-flux";

import { openDrawer } from "../../../actions/drawer";
import * as viewSelector from "../../../reducers/viewStore";
import { fetchPrediction } from "../../../actions/driver/home";
import { setHomeAddress } from "../../../actions/driver/settings";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
function mapStateToProps(state) {
  return {
    predictionArray: state.viewStore.predictionArray
  };
}
class SuggestLocation extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    fetchPrediction: PropTypes.func,
    predictionArray: PropTypes.array
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
    this.props.fetchPrediction(text);
  }
  setAddress(fetchedAddress) {
    Actions.pop({
      address: fetchedAddress
    });
    if (this.props.page === "HomeAddress") {
      this.props.setHomeAddress(fetchedAddress);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.string.length ? (
          <View style={{ margin: 14, marginTop: 135 }}>
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
        ) : null}
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
                  marginTop: -2,
                  fontSize: 16
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
                        top: Platform.OS === "ios" ? 15 : 10,
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
    fetchPrediction: string => dispatch(fetchPrediction(string)),
    fetchCoordinatesFromAddressAsync: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddressAsync(fetchedAddress)),
    fetchCoordinatesFromAddress: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddress(fetchedAddress)),
    setHomeAddress: homeAddress => dispatch(setHomeAddress(homeAddress))
  };
}
export default connect(mapStateToProps, bindActions)(SuggestLocation);
