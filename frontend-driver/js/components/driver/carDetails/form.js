import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import { Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import {
  Input,
  Button,
  Item,
  View,
  Form,
} from "native-base";

import { Actions } from "react-native-router-flux";
import { updateUserFormsDetails } from "../../../actions/driver/settings";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width } = Dimensions.get("window");

const validate = values => {
  const errors = {};
  if (!values.company) {
    errors.company = "Company Name is Required";
  } else if (!values.regNo) {
    errors.regNo = "Registration Number is Required";
  } else if (!values.RC_ownerName) {
    errors.RC_ownerName = "Owner Name is Required";
  } else if (!values.vehicleNo) {
    errors.vehicleNo = "Vehicle Number is Required";
  } else if (!values.carModel) {
    errors.carModel = "Car model is Required";
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
export const regDate = props => {
  const { meta, input: { onChange, value } } = props;
  return (
    <View style={{ flex: 1, width: null }}>
      <Datepickercustom
        onUpdate={updatedDate => onChange(updatedDate)}
        date={value}
      />
    </View>
  );
};

input.propTypes = {
  input: PropTypes.object
};
class Datepickercustom extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: null
        }}
      >
        <Item>
          <DatePicker
            style={{
              width: width,
              color: commonColor.lightThemePlaceholder
            }}
            date={this.props.date}
            mode="date"
            format="MM/DD/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            androidMode="default"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                height: null,
                alignItems: "flex-start"
              },
              dateText: {
                color: commonColor.lightThemePlaceholder
              }
            }}
            onDateChange={date => {
              this.props.onUpdate(date);
            }}
          />
        </Item>
      </View>
    );
  }
}

class CarForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func
  };
  submit(values) {
    const carDetails = {
      company: values.company,
      regNo: values.regNo,
      RC_ownerName: values.RC_ownerName,
      vehicleNo: values.vehicleNo,
      carModel: values.carModel,
      regDate: values.regDate
    };
    const userDetails = { ...this.props.user, carDetails };

    this.props.dispatch(updateUserFormsDetails(userDetails));
    Actions.bankDetails();
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
              name="company"
              placeholder="Company"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="regNo"
              placeholder="Registration Number"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="RC_ownerName"
              placeholder="Owner Name"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="vehicleNo"
              placeholder="Vehicle Number"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Field
              component={input}
              name="carModel"
              placeholder="Car Model"
              placeholderTextColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: commonColor.lightThemePlaceholder
              }}
            >
              Reg Date
            </Text>
            <Field component={regDate} name="regDate" />
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
              Next{" "}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

CarForm = reduxForm({
  form: "carform", // a unique name for this form
  validate
})(CarForm);

CarForm = connect(state => ({
  user: state.driver.user,
  initialValues: {
    fname: state.driver.user.fname,
    lname: state.driver.user.lname,
    email: state.driver.user.email,
    phoneNo: state.driver.user.phoneNo,
    homeAddress: state.driver.user.homeAddress,
    emergencyDetails: state.driver.user.emergencyDetails
  }
}))(CarForm);

export default CarForm;
