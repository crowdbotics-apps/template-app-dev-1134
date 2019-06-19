import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, View, Spinner } from "native-base";
import PropTypes from "prop-types";
import { signinAsyncFb } from "../../../actions/common/signin";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  return errors;
};

export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item>
        <Input {...input} {...props} />
      </Item>

      {meta.touched &&
        meta.error &&
        <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};
input.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};

class LoginFormFb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
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
      email: this.props.socialLogin.email,
      password: this.props.socialLogin.id,
      userType: "driver"
    };
    this.props.dispatch(signinAsyncFb(userInfo));
  }
  render() {
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Text style={{ color: commonColor.brandPrimary }}>
            {this.state.email}
          </Text>
        </View>
        <View style={styles.regBtnContain}>
          <Button
            onPress={this.props.handleSubmit(this.submit.bind(this))}
            block
            style={styles.regBtn}
          >
            {this.props.isFetching
              ? <Spinner />
              : <Text style={{ color: "#fff", fontWeight: "600" }}>
                SIGN IN
                </Text>}

          </Button>
        </View>
      </View>
    );
  }
}
export default reduxForm({
  form: "login", // a unique name for this form
  validate
})(LoginFormFb);
