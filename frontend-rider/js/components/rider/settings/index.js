import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
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
  Body,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import SettingsForm from "./form";
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from "../../../actions/rider/settings";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    fname: state.rider.user.fname,
    lname: state.rider.user.lname,
    email: state.rider.user.email,
    phoneNo: state.rider.user.phoneNo,
    profileUrl: state.rider.user.profileUrl,
    userDetails: state.rider.user,
    profileUpdating: state.rider.user.profileUpdating
  };
}
class Settings extends Component {
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

  _pickImage(userDetails) {
    var options = {
      title: "Select Avatar",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({ image: this.props.profileUrl });
      } else if (response.error) {
        this.setState({ image: this.props.profileUrl });
      } else {
        let source = { uri: response.uri };
        let userData = Object.assign(userDetails, {
          localUrl: source.uri
        });
        this.props.updateUserProfilePicAsync(userData, "profile");
      }
    });
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
              Settings
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
                  onPress={() => this._pickImage(this.props.userDetails)}
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
          <SettingsForm
            phoneNo={this.props.phoneNo && this.props.phoneNo.substr(3, 12)}
            code={this.props.phoneNo && this.props.phoneNo.substr(0, 3)}
          />
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails =>
      dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: (userData, type) =>
      dispatch(updateUserProfilePicAsync(userData, type))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Settings);
