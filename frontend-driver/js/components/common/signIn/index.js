import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, View } from "react-native";
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
import RegisterFormFb from "../register/formFb";
import * as appStateSelector from "../../../reducers/driver/appState";
import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import {
  clearEntryPage,
  socailLoginSuccessAndRoutetoRegister,
  socailSignupSuccess
} from "../../../actions/common/entrypage";
import { requestFbLogin } from "../loginFb";
import { signInWithGoogleAsync } from "../loginGoogle";
import { checkUser, userLoginRequest } from "../../../actions/common/checkUser";
import ModalView from "../ModalView";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

function mapStateToProps(state) {
  const getErrormsg = () => {
    if (!state.driver.appState.loginError) {
      return "";
    } else return state.driver.appState.errormsg;
  };
  return {
    loadingStatus: state.driver.appState.loadingStatus,
    isLoggedIn: state.driver.appState.isLoggedIn,
    loginError: state.driver.appState.loginError,
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    socialLogin: state.entrypage.socialLogin,
    appConfig: state.basicAppConfig.config
  };
}
class SignIn extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool,
    signinAsync: PropTypes.func,
    socailLoginSuccessAndRoutetoRegister: PropTypes.func,
    socailSignupSuccess: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      socialLogin: null
    };
  }
  state = {
    showError: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError) {
      this.setState({
        showError: true
      });
    } else {
      this.setState({
        showError: false
      });
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
              Sign In
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 10 }} scrollEnabled bounces={false}>
          {this.props.appConfig.enableGoogle ? (
            <Button
              onPress={() =>
                signInWithGoogleAsync(
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
                  Sign in with Google
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
              </Left>
              <Body style={{ flex: 3 }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Sign in with Facebook
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
              <View style={{ marginBottom: 30, marginTop: 20 }}>
                <View
                  style={{
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
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
                    marginTop: -40,
                    zIndex: -1
                  }}
                />
              </View>
            ) : null}
            {this.state.socialLogin && (
              <RegisterFormFb socialLogin={this.state.socialLogin} />
            )}
            {!this.state.socialLogin && (
              <LoginForm isFetching={this.props.isFetching} />
            )}
            {this.state.showError &&
              Toast.show({
                text: this.props.errormsg,
                position: "bottom",
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
    socailLoginSuccessAndRoutetoRegister: data =>
      dispatch(socailLoginSuccessAndRoutetoRegister(data)),
    socailSignupSuccess: route => dispatch(socailSignupSuccess(route)),
    signinAsync: userCredentials => dispatch(signinAsync(userCredentials)),
    changePageStatus: pageStatus => dispatch(changePageStatus(pageStatus))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(SignIn);
