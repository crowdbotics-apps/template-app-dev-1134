import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { Input, Button, Item, View, Form } from "native-base";

import { Actions } from "react-native-router-flux";
import { updateUserFormsDetails } from "../../../actions/driver/settings";
import commonColor from "../../../../native-base-theme/variables/commonColor";


const validate = values => {
  const errors = {};
  if (!values.accountNo) {
    errors.accountNo = "Account Number is Required";
  } else if (!values.holderName) {
    errors.holderName = "Account Holder Name is Required";
  } else if (!values.IFSC) {
    errors.IFSC = "IFSC code is Required";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Item>
        <Input
          {...input}
          {...props}
        // style={{ fontWeight: "bold", marginLeft: 2, borderBottomWidth: 1 }}
        />
      </Item>
      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

input.propTypes = {
  input: PropTypes.object
};

class BankForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func
  };
  // submit(values) {
  //   Actions.driverStartupService();
  // }

  submit(values) {
    const bankDetails = {
      accountNo: values.accountNo,
      holderName: values.holderName,
      IFSC: values.IFSC
    };
    const userDetails = { ...this.props.user, bankDetails };

    this.props.dispatch(updateUserFormsDetails(userDetails));
    this.props.user.isApproved
      ?
      Actions.driverStartupService()
      :
      Actions.driverAccessMessage()
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "space-around"
        }}
      >
        <Form>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              placeholder="Account Number"
              placeholderTextColor={commonColor.lightThemePlaceholder}
              name="accountNo"
              keyboardType="numeric"
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="holderName"
              placeholder="Account Holder Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="IFSC"
              placeholder="IFSC code"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
        </Form>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15
          }}
        >
          <Button
            style={{
              flex: 1,
              padding: 10,
              height: 50,
              bottom: 0,
              marginHorizontal: 5,
              marginTop: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => Actions.pop()}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18
              }}
            >
              {" "}
              Back{" "}
            </Text>
          </Button>
          <Button
            style={{
              flex: 1,
              padding: 10,
              height: 50,
              bottom: 0,
              marginHorizontal: 5,
              marginTop: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {" "}
              Finish{" "}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

BankForm = reduxForm({
  form: "bankform", // a unique name for this form
  validate
})(BankForm);

BankForm = connect(state => ({
  user: state.driver.user,
  initialValues: {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    phoneNo: state.driver.user.phoneNo,
    homeAddress: state.driver.user.homeAddress,
    emergencyDetails: state.driver.user.emergencyDetails
  }
}))(BankForm);

export default BankForm;
