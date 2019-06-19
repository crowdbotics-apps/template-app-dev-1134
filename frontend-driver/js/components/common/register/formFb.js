import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { View, Text } from "react-native";
import { Item, Input, Button, Grid, Col, Spinner } from "native-base";
import CountryPicker from "react-native-country-picker-modal";
import PropTypes from "prop-types";

import { registerAsyncFb } from "../../../actions/common/register";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = "Phone number is Required";
  } else if (!values.phone.match(/^\d{10}$/)) {
    errors.phone = "Invalid phone number";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Item>
        <Input {...input} {...props} />
      </Item>

      {meta.touched &&
        meta.error &&
        <Text style={{ color: "red" }}>
          {meta.error}
        </Text>}
    </View>
  );
};

class RegisterFb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: "IN",
      callingCode: "91",
      name: "IN"
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
    socialLogin: PropTypes.object
  };
  componentWillMount() {
    const socialLogin = this.props.socialLogin;
    if (socialLogin !== null) {
      this.setState({
        fname: socialLogin.fname,
        lname: socialLogin.lname,
        email: socialLogin.email
      });
    }
  }
  submit(values) {
    const userInfo = {
      fname: this.props.socialLogin.fname,
      lname: this.props.socialLogin.lname,
      email: this.props.socialLogin.email,
      phoneNo: values.phone,
      userType: "driver"
    };
    this.props.dispatch(
      registerAsyncFb({ ...userInfo, callingCode: this.state.callingCode })
    );
  }
  render() {
    return (
      <View>
        <Grid>
          <Col style={{ padding: 10 }}>
            <Text style={{ color: commonColor.brandPrimary }}>
              {this.state.fname}
            </Text>
          </Col>
          <Col style={{ padding: 10 }}>
            <Text style={{ color: commonColor.brandPrimary }}>
              {this.state.lname}
            </Text>
          </Col>
        </Grid>
        <View style={{ padding: 10 }}>
          <Text style={{ color: commonColor.brandPrimary }}>
            {this.state.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch"
          }}
        >
          <CountryPicker
            cca2={this.state.cca2}
            onChange={value =>
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode
              })}
          />
          <Field
            component={input}
            name="phone"
            placeholder="Mobile Number"
            placeholderTextColor={commonColor.lightThemePlaceholder}
            keyboardType="numeric"
          />
        </View>
        {this.props.error &&
          <Text style={{ color: "red" }}>
            {this.props.error}
          </Text>}
        <View style={styles.regBtnContain}>
          <Button
            onPress={this.props.handleSubmit(this.submit.bind(this))}
            block
            style={styles.regBtn}
          >
            {this.props.isFetching
              ? <Spinner />
              : <Text style={{ color: "#fff", fontWeight: "600" }}>
                REGISTER
                </Text>}
          </Button>
        </View>
      </View>
    );
  }
}
export default reduxForm({
  form: "register-fb", // a unique name for this form
  validate
})(RegisterFb);
