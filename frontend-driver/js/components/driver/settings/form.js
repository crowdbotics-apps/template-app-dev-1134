import React, { Component } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Input, Card, CardItem, Icon, Button, Label, Item, Form } from "native-base";

import { updateUserProfileAsync } from "../../../actions/driver/settings";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width, height } = Dimensions.get("window");

const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = "Email is Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email";
	} else if (!values.phoneNo) {
		errors.phoneNo = "Phone number is Required";
	}
	// } else if (!values.phoneNo.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i)) {
	// 	errors.phoneNo = "Invalid phone number";
	// } // else if(!values.password) {
	//   errors.password = "password is Required";
	// }
	return errors;
};

export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<View style={{ flexDirection: "row", flex: 1 }}>
				<Input
					{...input}
					{...props}
					style={{
						fontWeight: "400",
						marginLeft: 2,
						borderBottomWidth: 1,
						borderBottomColor: "#6895B0",
						color: commonColor.brandPrimary
					}}
					onFocus={() => {
						{
							input.name === "homeAddress"
								? Actions.suggestLocation({
										heading: "Home Address",
										page: "HomeAddress"
									})
								: null;
						}
					}}
				/>
			</View>
			<View>{meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}</View>
		</View>
	);
};
input.propTypes = {
	input: PropTypes.object
};

class SettingsForm extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func
	};

	componentWillReceiveProps(nextProps) {
		nextProps.dispatch(change("settings", "homeAddress", nextProps.initialValues.homeAddress));
	}
	submit(values) {
		this.props.dispatch(updateUserProfileAsync({...values, userType: 'driver'}));
	}
	render() {
		return (
			<View>
				<Form>
					<Item
						stackedLabel
						style={{
							borderBottomWidth: 0,
							alignItems: "stretch",
							marginHorizontal: 10,
							flex: 1
						}}
					>
						<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
							FIRST NAME
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="fname" />
					</Item>
					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
							LAST NAME
						</Label>
						<Field component={input} style={{ marginLeft: 10, width: width - 10 }} name="lname" />
					</Item>
					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
							EMAIL
						</Label>
						<Field
							component={input}
							style={{ marginLeft: 10, width: width - 10 }}
							name="email"
							editable={false}
						/>
					</Item>

					<Item
						stackedLabel
						style={{
							marginHorizontal: 10,
							flex: 1,
							alignItems: "stretch",
							borderBottomWidth: 0
						}}
					>
						<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
							MOBILE
						</Label>
						<Field
							component={input}
							style={{ marginLeft: 10, width: width - 10 }}
							keyboardType="numeric"
							name="phoneNo"
						/>
					</Item>
				</Form>
				<Form>
					<Card style={{ marginTop: 20, backgroundColor: "#F8F8F8" }}>
						<CardItem style={styles.blueBorder}>
							<Text style={styles.blueHeader}>PLACES</Text>
						</CardItem>
						<CardItem style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}>
							<Item
								stackedLabel
								style={{
									marginHorizontal: 10,
									flex: 1,
									alignItems: "stretch",
									borderBottomWidth: 1,
									borderBottomColor: "#6895B0"
								}}
							>
								<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
									<Icon name="ios-home" style={{ fontSize: 30 }} /> Home
								</Label>
								<Button
									style={{
										marginLeft: 8,
										width: width - 25
									}}
									onPress={() => {
										Actions.suggestLocation({
											heading: "Home Address",
											page: "HomeAddress"
										});
									}}
									transparent
								>
									<Text
										style={{
											fontWeight: "400",
											marginLeft: 2,
											color: commonColor.brandPrimary
										}}
									>
										{this.props.homeAddress ? this.props.homeAddress : null}
									</Text>
								</Button>
							</Item>
						</CardItem>
						<CardItem style={styles.blueBorder}>
							<Text style={styles.blueHeader}>EMERGENCY CONTACT</Text>
						</CardItem>
						<CardItem style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}>
							<Item
								stackedLabel
								style={{
									marginHorizontal: 10,
									flex: 1,
									alignItems: "stretch",
									borderBottomWidth: 0
								}}
							>
								<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
									Name
								</Label>
								<Field
									component={input}
									style={{ marginLeft: 10, width: width - 10 }}
									name="emergencyDetails.name"
								/>
							</Item>
						</CardItem>
						<CardItem style={{ paddingLeft: 10, paddingRight: 0, paddingTop: 0 }}>
							<Item
								stackedLabel
								style={{
									marginHorizontal: 10,
									flex: 1,
									alignItems: "stretch",
									borderBottomWidth: 0
								}}
							>
								<Label style={{ color: "#6895B0", fontWeight: "bold" }} note>
									Mobile
								</Label>
								<Field
									component={input}
									style={{ marginLeft: 10, width: width - 10 }}
									keyboardType="numeric"
									name="emergencyDetails.phone"
								/>
							</Item>
						</CardItem>
					</Card>
				</Form>
				<Button
					block
					style={{ padding: 10, height: 50, marginHorizontal: 5, bottom: 0 }}
					onPress={this.props.handleSubmit(this.submit.bind(this))}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}> Save </Text>
				</Button>
			</View>
		);
	}
}

SettingsForm = reduxForm({
	form: "settings", // a unique name for this form
	validate
})(SettingsForm);

SettingsForm = connect(state => ({
	homeAddress: formValueSelector("settings")(state, "homeAddress"),
	initialValues: {
		fname: state.driver.user.fname,
		lname: state.driver.user.lname,
		email: state.driver.user.email,
		phoneNo: state.driver.user.phoneNo,
		homeAddress: state.driver.user.homeAddress,
		emergencyDetails: state.driver.user.emergencyDetails
	}
}))(SettingsForm);
export default SettingsForm;
