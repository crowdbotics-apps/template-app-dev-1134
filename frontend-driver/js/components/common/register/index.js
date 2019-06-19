import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Item,
  Spinner,
  Body,
  Toast
} from "native-base";
import { Actions } from "react-native-router-flux";
import { requestFbLogin } from "../loginFb";
import { registerWithGoogleAsync } from "../loginGoogle";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import * as appStateSelector from "../../../reducers/driver/appState";
import RegisterForm from "./form";
import RegisterFormFb from "./formFb";

import { registerAsync } from "../../../actions/common/register";
import {
  clearEntryPage,
  socailSignupSuccess
} from "../../../actions/common/entrypage";

import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import ModalView from "../ModalView";

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.registerError) {
      return "";
    } else if (state.driver.appState.errormsg === "Internal Server Error") {
      return "Email or Mobile Number already Registered";
    } else return state.driver.appState.errormsg;
  };

  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    registerError: state.driver.appState.registerError,
    socialLogin: state.entrypage.socialLogin,
    appConfig: state.basicAppConfig.config,
    isFetching: appStateSelector.isFetching(state),
    errormsg: getErrormsg()
  };
}
class Register extends Component {
  static propTypes = {
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    socailSignupSuccess: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      checkDriver: false,
      registerError: false,
      FirstNameChange: "",
      LastNameChange: "",
      EmailChange: "",
      MobileNumberChange: "",
      PasswordChange: "",
      socialLogin: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registerError) {
      this.setState({ registerError: true });
    } else {
      this.setState({ registerError: false });
    }
    if (nextProps.socialLogin.email !== null) {
      this.setState({ socialLogin: nextProps.socialLogin });
    }
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
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
                style={{
                  fontSize: 28,
                  marginLeft: 5,
                  color: commonColor.brandPrimary
                }}
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
              Register
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 10 }} scrollEnabled bounces={false}>
          {this.props.appConfig.enableGoogle ? (
            <Button
              onPress={() =>
                registerWithGoogleAsync(
                  this.props.socailSignupSuccess,
                  this.props.appConfig.googleAuth,
                  this.props.checkUser,
                  this.props.userLoginRequest
                )
              }
              block
              style={{
                paddingLeft: 0,
                backgroundColor: "red",
                marginBottom: 15,
                borderRadius: 4,
                height: 50
              }}
            >
              <Left style={styles.googleLeft}>
                <Icon active name="logo-googleplus" style={{ color: "#fff" }} />
              </Left>
              <Body style={{ flex: 3 }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Sign up with Google
                </Text>
              </Body>
              <Right />
            </Button>
          ) : (
            <View />
          )}
          {this.props.appConfig.enableFacebook ? (
            <Button
              onPress={() =>
                requestFbLogin(
                  this.props.socailSignupSuccess,
                  this.props.appConfig.facebookAuth,
                  this.props.checkUser,
                  this.props.userLoginRequest
                )
              }
              block
              style={{
                paddingLeft: 0,
                backgroundColor: "#3B579D",
                borderRadius: 4,
                height: 50
              }}
            >
              <Left style={styles.fbLeft}>
                <FAIcon
                  name="facebook"
                  style={{ fontSize: 30, color: "#fff" }}
                />
                {/*<Icon name="logo-facebook" style={{ color: "#fff", backgroundColor: "#3B579D" }} />*/}
              </Left>
              <Body style={{ flex: 3 }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Sign up with Facebook
                </Text>
              </Body>
              <Right />
            </Button>
          ) : (
            <View />
          )}
          <View style={{ padding: 10 }}>
            {this.props.appConfig.enableFacebook ||
            this.props.appConfig.enableGoogle ? (
              <View style={{ marginBottom: 10, marginTop: 10 }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: "#5D81A3",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.orText}>OR</Text>
                  </View>
                </View>
                <Item
                  style={{
                    flex: 1,
                    height: 1,
                    borderColor: "#5D81A3",
                    marginTop: -25,
                    zIndex: -1
                  }}
                />
              </View>
            ) : null}
            {this.state.socialLogin && (
              <RegisterFormFb socialLogin={this.state.socialLogin} />
            )}
            {!this.state.socialLogin && (
              <RegisterForm isFetching={this.props.isFetching} />
            )}
            {this.state.registerError &&
              Toast.show({
                text: this.props.errormsg,
                position: "bottom",
                buttonText: "Okay",
                duration: 1500
              })}
          </View>
          {this.props.loadingStatus ? this.showLoaderModal() : null}
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    checkUser: (obj1, obj2) => dispatch(checkUser(obj1, obj2)),
    userLoginRequest: () => dispatch(userLoginRequest()),
    clearEntryPage: () => dispatch(clearEntryPage()),
    socailSignupSuccess: route => dispatch(socailSignupSuccess(route)),
    registerAsync: userCredentials => dispatch(registerAsync(userCredentials)),
    registerAsyncFb: userObj => dispatch(registerAsyncFb(userObj))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Register);
