import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import { Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Input, Button, Item, View, Form } from "native-base";
import { updateUserFormsDetails } from "../../../actions/driver/settings";
import { Actions, ActionConst } from "react-native-router-flux";

import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width } = Dimensions.get("window");

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

const validate = values => {
	const errors = {};
	if (!values.licenceNo) {
		errors.licenceNo = "Licence Number is Required";
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
			{meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
		</View>
	);
};

export const issueDate = props => {
	const { meta, input: { onChange, value } } = props;
	return (
		<View style={{ flex: 1, width: null }}>
			<Datepickercustom onUpdate={updatedDate => onChange(updatedDate)} date={value} />
		</View>
	);
};
export const expDate = props => {
	const { meta, input: { onChange, value } } = props;
	return (
		<View style={{ flex: 1, width: null }}>
			<Datepickercustom onUpdate={updatedDate => onChange(updatedDate)} date={value} />
		</View>
	);
};

input.propTypes = {
	input: PropTypes.object
};

class LicenceForm extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func
	};

	submit(values) {
		const licenceDetails = {
			issueDate: values.expDate,
			expDate: values.issueDate,
			licenceNo: values.licenceNo
		};
		const userDetails = { ...this.props.user, licenceDetails };

		this.props.dispatch(updateUserFormsDetails(userDetails));
		Actions.carDetails();
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
							name="licenceNo"
							placeholder="Licence Number"
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
							Issue Date
						</Text>
						<Field component={issueDate} name="issueDate" />
					</View>
					<View style={{ padding: 10 }}>
						<Text
							style={{
								fontWeight: "bold",
								color: commonColor.lightThemePlaceholder
							}}
						>
							Expiry Date
						</Text>
						<Field component={expDate} name="expDate" />
					</View>
				</Form>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						bottom: 0
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
						<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}> Next </Text>
					</Button>
				</View>
			</View>
		);
	}
}

LicenceForm = reduxForm({
	form: "licenceform", // a unique name for this form
	validate
})(LicenceForm);

LicenceForm = connect(state => ({
	user: state.driver.user,
	initialValues: {
		fname: state.driver.user.fname,
		lname: state.driver.user.lname,
		email: state.driver.user.email,
		phoneNo: state.driver.user.phoneNo,
		homeAddress: state.driver.user.homeAddress,
		emergencyDetails: state.driver.user.emergencyDetails
	}
}))(LicenceForm);

export default LicenceForm;
