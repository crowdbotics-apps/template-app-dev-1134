import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, View } from "react-native";
import PropTypes from "prop-types";
import FAIcon from "react-native-vector-icons/FontAwesome";
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
  Body,
  Spinner,
  Toast
} from "native-base";
import { Actions } from "react-native-router-flux";
import RegisterFormFb from "../register/formFb";
import * as userSelector from "../../../reducers/rider/user";
import * as appStateSelector from "../../../reducers/rider/appState";
import LoginForm from "./form";
import { signinAsync } from "../../../actions/common/signin";
import { changePageStatus } from "../../../actions/rider/home";
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
  return {
    loadingStatus: state.rider.appState.loadingStatus,
    isLoggedIn: state.rider.appState.isLoggedIn,
    loginError: state.rider.appState.loginError,
    userType: userSelector.getUserType(state),
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    socialLogin: state.entrypage.socialLogin,
    pageStatus: state.rider.appState.pageStatus,
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
  UNSAFE_componentWillReceiveProps(nextProps) {
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
              iconLeft
              block
              onPress={() =>
                signInWithGoogleAsync(
                  this.props.socailSignupSuccess,
                  this.props.appConfig.googleAuth,
                  this.props.checkUser,
                  this.props.userLoginRequest
                )
              }
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
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
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
              iconLeft
              block
              onPress={() =>
                requestFbLogin(
                  this.props.socailSignupSuccess,
                  this.props.appConfig.facebookAuth,
                  this.props.checkUser,
                  this.props.userLoginRequest
                )
              }
              style={{
                paddingLeft: 0,
                backgroundColor: "#3B579D",
                borderRadius: 4,
                height: 50
              }}
            >
              <Left style={styles.fbLeft}>
                {/*<Evil name="ei-sc-facebook" style={{ color: "#fff" }} />*/}
                <FAIcon
                  name="facebook"
                  style={{ fontSize: 30, color: "#fff" }}
                />
              </Left>
              <Body style={{ flex: 3 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
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

export default connect(mapStateToProps, bindActions)(SignIn);
