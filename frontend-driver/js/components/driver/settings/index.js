import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
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
  Spinner,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";

import SettingsForm from "./form";
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync
} from "../../../actions/driver/settings";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.driver.appState.jwtAccessToken,
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    profileUrl: state.driver.user.profileUrl,
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null
    };
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
          profileUrl: source.uri
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
                  onPress={() => this._pickImage(this.props.userDetails)}
                  style={{ paddingRight: 20, borderBottomWidth: 0 }}
                >
                  
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#eee"
                      }}
                    >
                     <Thumbnail
                      source={{ uri: this.props.profileUrl }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        borderWidth: 3
                      }}
                    />
                    </View>
                </Item>
                <Body>
                  <Text
                    style={{
                      color: "#fff",
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
          <SettingsForm />
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
