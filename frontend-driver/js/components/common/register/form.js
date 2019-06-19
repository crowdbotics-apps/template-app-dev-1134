import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text, Dimensions, Alert } from "react-native";
import {
  Item,
  Input,
  Button,
  Grid,
  Col,
  View,
  Icon,
  Card,
  CardItem,
  Title,
  Left,
  Right,
  Body,
  Label,
  Spinner
} from "native-base";
import CountryPicker from "react-native-country-picker-modal";
import PropTypes from "prop-types";

import { registerAsync } from "../../../actions/common/register";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import ModalView from "../../common/ModalView";
const { width } = Dimensions.get("window");
const deviceHeight = Dimensions.get("window").height;
import config from "../../../../config";

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = "First name is Required";
  } else if (!/^[a-zA-Z]*$/.test(values.fname)) {
    errors.fname = "Invalid first name";
  } else if (!values.lname) {
    errors.lname = "Last name is Required";
  } else if (!/^[a-zA-Z]*$/.test(values.lname)) {
    errors.lname = "Invalid last name";
  } else if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  } else if (!values.phoneNo) {
    errors.phoneNo = "Phone number is Required";
  } else if (!values.phoneNo.match(/^\d{9,10}$/)) {
    errors.phoneNo = "Invalid phone number";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Entered passwords doesn't match";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Item
        style={{
          borderBottomWidth: input.name === "phoneNo" ? 0 : 0.5
        }}
      >
        <Input {...input} {...props} />
      </Item>

      {meta.touched && meta.error && (
        <Text style={{ color: "red" }}>{meta.error}</Text>
      )}
    </View>
  );
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: "US",
      callingCode: "1",
      name: "US",
      showPhoneVerify: false,
      verifyCode: ""
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFetching: PropTypes.bool
  };
  // submit(values) {
  //   this.props.dispatch(
  //     registerAsync({ ...values, callingCode: this.state.callingCode })
  //   );
  // }

  preSubmit = values => {
    this.setState({
      showPhoneVerify: true
    });

    this.requestCodeAsync({ ...values, callingCode: this.state.callingCode });
  };

  submitCode = values => {
    this.props.dispatch(
      phoneVerifyAsync({ ...values, callingCode: this.state.callingCode })
    );
  };

  submit = async values => {
    if (this.state.verifyCode == "") {
      Alert.alert("INFO", "Please input your code");
      return;
    }
    const ret = await this.verifyCodeAsync({
      ...values,
      callingCode: this.state.callingCode,
      verifyCode: this.state.verifyCode
    });

    // console.error('ret', ret)

    if (ret === true) {
      this.setState({
        showPhoneVerify: false,
        verifyCode: ""
      });
      this.props.dispatch(
        registerAsync({ ...values, callingCode: this.state.callingCode })
      );
    }
  };

  phoneVerify = () => {
    return (
      <ModalView>
        <View
          style={{
            backgroundColor: "transparent",
            padding: 20,
            height: deviceHeight / 2
          }}
        >
          <Card
            style={{
              width: width - 30,
              height: null,
              borderRadius: 4,
              justifyContent: "space-between"
            }}
          >
            <CardItem
              style={{
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#EFEDED"
              }}
            >
              <Body
                style={{
                  paddingVertical: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#727376"
                  }}
                >
                  PHONE VERIFICATION
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Label style={{ alignSelf: "center" }}>
                What's your verification code?
              </Label>
            </CardItem>
            <CardItem>
              <Item regular>
                <Input
                  onChangeText={verifyCode => this.setState({ verifyCode })}
                />
              </Item>
            </CardItem>
            <Button
              full
              info
              onPress={this.props.handleSubmit(this.submit.bind(this))}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Verify Code
              </Text>
            </Button>
            <Button
              full
              light
              onPress={() => this.setState({ showPhoneVerify: false })}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
              }}
            >
              <Text style={{ color: "black", fontWeight: "700" }}>Cancel</Text>
            </Button>
          </Card>
        </View>
      </ModalView>
    );
  };

  render() {
    return (
      <View>
        {this.state.showPhoneVerify ? this.phoneVerify(this) : null}

        <Grid>
          <Col style={{ padding: 10 }}>
            <Field
              component={input}
              name="fname"
              placeholder="First Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </Col>
          <Col style={{ padding: 10 }}>
            <Field
              component={input}
              name="lname"
              placeholder="Last Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </Col>
        </Grid>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            type="email"
            name="email"
            placeholder="Email"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch",
            borderBottomWidth: 0.5,
            marginLeft: 15
          }}
        >
          <CountryPicker
            cca2={this.state.cca2}
            onChange={value =>
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode
              })
            }
          />
          <Field
            component={input}
            name="phoneNo"
            placeholder="Mobile Number"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            keyboardType="numeric"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="password"
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Field
            component={input}
            name="confirmPassword"
            placeholder="Confirm password"
            secureTextEntry
            placeholderTextColor={commonColor.lightThemePlaceholder}
            autoCapitalize="none"
          />
        </View>
        {this.props.error && (
          <Text style={{ color: "red" }}>{this.props.error}</Text>
        )}
        <View style={styles.regBtnContain}>
          <Button
            //onPress={this.props.handleSubmit(this.submit.bind(this))}
            onPress={this.props.handleSubmit(this.preSubmit.bind(this))}
            block
            style={styles.regBtn}
          >
            {this.props.isFetching ? (
              <Spinner />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Register
              </Text>
            )}
          </Button>
        </View>
      </View>
    );
  }

  requestCodeAsync = async obj => {
    try {
      const form = convertObjectToFormData({
        via: "SMS",
        phone_number: obj.phoneNo,
        country_code: obj.callingCode
      });
      const res = await fetch(
        `https://api.authy.com//protected/json/phones/verification/start`,
        {
          method: "POST",
          headers: {
            "X-Authy-API-Key": config.authyID
          },
          body: form
        }
      );
      const data = await res.json();

      // console.error(res);
      if (res.status != 200) Alert.alert("ERROR", data.message);
      //   console.error(res)
    } catch (error) {
      //   console.error(error);
      Alert.alert(
        "ERROR",
        "Verification code could not be sent. Please try again."
      );
    }
  };

  verifyCodeAsync = async obj => {
    const res = await fetch(
      `https://api.authy.com/protected/json/phones/verification/check?phone_number=${
        obj.phoneNo
      }&country_code=${obj.callingCode}&verification_code=${obj.verifyCode}`,
      {
        method: "GET",
        headers: {
          "X-Authy-API-Key": config.authyID
        }
      }
    );

    // console.error('hey')

    if (res.status != 200) {
      Alert.alert("ERROR", "Verification failed. Please try again.");
      //  console.error(res)

      return false;
    }
    // console.error(res)
    return true;
  };
}

const convertObjectToFormData = (obj = {}) => {
  let form = new FormData();
  Object.keys(obj).forEach(key => {
    form.append(key, obj[key]);
  });
  return form;
};

export default reduxForm({
  form: "register", // a unique name for this form
  validate
})(RegisterForm);
