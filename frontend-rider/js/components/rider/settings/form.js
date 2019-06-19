import React, { Component } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { Input, Card, CardItem, Icon, Button, Label, Item, Form } from "native-base";
import { updateUserProfileAsync } from "../../../actions/rider/settings";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const { width } = Dimensions.get("window");
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = "Email is Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email";
	} else if (!values.phoneNo) {
		errors.phoneNo = "Phone number is Required";
	}
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
							input.name === "workAddress" || input.name === "homeAddress"
								? Actions.suggestLocation({
										heading: input.name === "homeAddress" ? "Home Address" : "Work Address",
										page: input.name === "homeAddress" ? "HomeAddress" : "WorkAddress"
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
	constructor(props) {
		super(props);
		this.state = {
			isfetched: false
		};
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		nextProps.dispatch(change("settings", "homeAddress", nextProps.initialValues.homeAddress));
		nextProps.dispatch(change("settings", "workAddress", nextProps.initialValues.workAddress));
	}
	submit(values) {
		this.props.dispatch(updateUserProfileAsync({...values, userType: 'rider'}));
	}
	render() {
		return (
			<View>
				<Form>
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
							FIRST NAME
						</Label>
						<Field
							component={input}
							ref={input => (this.fname = input)}
							style={{ marginLeft: 10, width: width - 10 }}
							name="fname"
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
									<Icon name="ios-briefcase" style={{ fontSize: 30 }} /> Work
								</Label>
								<Button
									style={{
										marginLeft: 8,
										width: width - 25
									}}
									onPress={() => {
										Actions.suggestLocation({
											heading: "Work Address",
											page: "WorkAddress"
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
										{this.props.workAddress ? this.props.workAddress : null}
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
					style={{
						padding: 10,
						height: 50,
						marginHorizontal: 5,
						bottom: 0
					}}
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
	workAddress: formValueSelector("settings")(state, "workAddress"),
	initialValues: {
		fname: state.rider.user.fname,
		lname: state.rider.user.lname,
		email: state.rider.user.email,
		phoneNo: state.rider.user.phoneNo,
		workAddress: state.rider.user.workAddress,
		homeAddress: state.rider.user.homeAddress,
		emergencyDetails: state.rider.user.emergencyDetails
	}
}))(SettingsForm);
export default SettingsForm;
