import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Label,
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const { width } = Dimensions.get("window");

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    phoneNo: state.driver.user.phoneNo,
    profileUpdating: state.driver.user.profileUpdating,
    emergencyDetails: state.driver.user.emergencyDetails,
    workAddress: state.driver.user.workAddress,
    homeAddress: state.driver.user.homeAddress
  };
}
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
      render: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetails !== nextProps.userDetails) {
      this.setState({
        render: true
      });
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarColorDark}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: "#fff" }}
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
              User Details
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card
            style={{
              marginTop: 0,
              marginRight: 0,
              paddingTop: 20,
              paddingBottom: 20,
              marginLeft: 0
            }}
          >
            <CardItem style={{ padding: 0 }}>
              <Left>
                <Item
                  style={{
                    paddingRight: 20,
                    borderBottomWidth: 0,
                    borderWidth: 5
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {this.props.profileUpdating ? (
                      <Spinner />
                    ) : (
                      <Thumbnail
                        source={{ uri: this.props.profileUrl }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 35
                        }}
                      />
                    )}
                  </View>
                </Item>
                <Body>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      color: "#0F517F"
                    }}
                  >
                    {this.props.fname} {this.props.lname}
                  </Text>
                  <Text note style={{ color: "#6895B0" }}>
                    {this.props.email}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <View style={{ padding: 15 }}>
            <Item
              stackedLabel
              style={{
                margintop: 5,
                flex: 1,
                alignItems: "stretch",
                borderBottomWidth: 1
              }}
            >
              <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                FIRST NAME
              </Label>
              <Text style={{ lineHeight: 50 }}>{this.props.fname}</Text>
            </Item>
            <Item
              stackedLabel
              style={{
                margintop: 5,
                flex: 1,
                alignItems: "stretch",
                borderBottomWidth: 1
              }}
            >
              <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                LAST NAME
              </Label>
              <Text style={{ lineHeight: 50 }}>{this.props.lname}</Text>
            </Item>
            <Item
              stackedLabel
              style={{
                margintop: 5,
                flex: 1,
                alignItems: "stretch",
                borderBottomWidth: 1
              }}
            >
              <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                EMAIL
              </Label>
              <Text style={{ lineHeight: 50 }}>{this.props.email}</Text>
            </Item>
            <Item
              stackedLabel
              style={{
                margintop: 5,
                flex: 1,
                alignItems: "stretch",
                borderBottomWidth: 1
              }}
            >
              <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                MOBILE
              </Label>
              <Text style={{ lineHeight: 50 }}>{this.props.phoneNo}</Text>
            </Item>
          </View>
          <Card style={{ marginTop: 20, backgroundColor: "#F8F8F8" }}>
            <CardItem style={styles.blueBorder}>
              <Text style={styles.blueHeader}>PLACES</Text>
            </CardItem>
            <CardItem
              style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}
            >
              <Item
                stackedLabel
                style={{
                  marginHorizontal: 10,
                  flex: 1,
                  alignItems: "stretch",
                  borderBottomWidth: 1,
                  borderBottomColor: "#6895B0"
                }}
              >
                <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                  <Icon name="ios-home" style={{ fontSize: 30 }} /> Home
                </Label>
                <Button
                  style={{
                    marginLeft: 8,
                    width: width - 25
                  }}
                  transparent
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      marginLeft: 2,
                      color: commonColor.brandPrimary
                    }}
                  >
                    {this.props.homeAddress ? this.props.homeAddress : null}
                  </Text>
                </Button>
              </Item>
            </CardItem>
            <CardItem style={styles.blueBorder}>
              <Text style={styles.blueHeader}>EMERGENCY CONTACT</Text>
            </CardItem>
            <CardItem
              style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}
            >
              <Item
                stackedLabel
                style={{
                  marginHorizontal: 10,
                  flex: 1,
                  alignItems: "stretch",
                  borderBottomWidth: 1
                }}
              >
                <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                  Name
                </Label>
                <Text style={{ lineHeight: 50 }}>
                  {this.props.emergencyDetails.name}{" "}
                </Text>
              </Item>
            </CardItem>
            <CardItem
              style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}
            >
              <Item
                stackedLabel
                style={{
                  marginHorizontal: 10,
                  flex: 1,
                  alignItems: "stretch",
                  borderBottomWidth: 1
                }}
              >
                <Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
                  Mobile
                </Label>
                <Text style={{ lineHeight: 50 }}>
                  {this.props.emergencyDetails.phone}{" "}
                </Text>
              </Item>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  bindActions
)(UserDetails);
