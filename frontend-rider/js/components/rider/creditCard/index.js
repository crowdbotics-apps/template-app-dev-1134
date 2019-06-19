import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
import {
	Container,
	Header,
	Content,
	Text,
	Button,
	Icon,
	Title,
	Right,
	Left,
	Body,
	CheckBox,
	Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";
import { CreditCardInput } from "react-native-credit-card-input";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { addCard } from "../../../actions/payment/riderCardPayment";
import ModalView from "../../common/ModalView";

class CreditCardq extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cca2: "AI",
			number: "",
			expiry: "",
			saveCardDetails: true,
			errorMsg: ""
		};
		this.formData;
		this.amount = 1000;
	}

	sendCardDetails(data) {
		var cardExpiryDetails = data.expiry.split("/");
		const cardData = {
			email: this.props.userEmail,
			cardNumber: data.number,
			nameOnCard: data.name,
			cvc: parseInt(data.cvc),
			cardType: data.type,
			expiryMonth: parseInt(cardExpiryDetails[0]),
			expiryYear: parseInt(cardExpiryDetails[1]),
			saveCard: this.state.saveCardDetails
		};
		const additionalData = {
			amount: this.amount
		};
		this.props.addCard(cardData, additionalData);
	}

	showLoaderModal() {
		return (
			<ModalView>
				<Spinner />
			</ModalView>
		);
	}

	_onChange = formData => {
		/* eslint no-console: 0 */
		this.formData = formData;
		if (this.state.errorMsg !== "") {
			this.setState({ errorMsg: "" });
		}
	};

	_onFocus = field => {
		/* eslint no-console: 0 */
		console.log(field);
	};

	_onSubmit = () => {
		if (this.formData) {
			if (this.formData.status.number !== "valid") {
				this.setState({ errorMsg: "Invalid Card Number" });
			} else if (this.formData.status.expiry !== "valid") {
				this.setState({ errorMsg: "Invalid Expiry Date" });
			} else if (this.formData.status.cvc !== "valid") {
				this.setState({ errorMsg: "Invalid CCV Number" });
			} else if (this.formData.status.name !== "valid") {
				this.setState({ errorMsg: "Invalid Name" });
			} else {
				this.sendCardDetails(this.formData.values);
			}
		} else {
			this.setState({ errorMsg: "Card Details Empty" });
		}
	};
	render() {
		return (
			<Container style={{ backgroundColor: "#fff" }}>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
				>
					<Left>
						<Button transparent onPress={() => Actions.cardPayment()}>
							<Icon name="md-arrow-back" style={{ fontSize: 28, color: commonColor.brandPrimary }} />
						</Button>
					</Left>
					<Body>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Add Payment
						</Title>
					</Body>
					<Right />
				</Header>
				<Content style={{ padding: 20 }}>
					<CreditCardInput
						autoFocus
						requiresName
						requiresCVC
						labelStyle={styles.label}
						inputStyle={styles.input}
						validColor={"black"}
						invalidColor={"red"}
						placeholderColor={"darkgray"}
						onFocus={this._onFocus}
						onChange={this._onChange}
					/>
					<View style={{ marginTop: 20 }}>
						<Text style={{ color: "red" }}>{this.state.errorMsg}</Text>
					</View>
					<View style={{ marginVertical: 20, flexDirection: "row" }}>
						<CheckBox
							checked={this.state.saveCardDetails}
							style={{ marginRight: 20 }}
							onPress={() => this.setState({ saveCardDetails: !this.state.saveCardDetails })}
						/>
						<Text>Save this card for faster checkout</Text>
					</View>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Button style={{ alignSelf: "center", flex: 1 }} onPress={this._onSubmit}>
							<Text>Update Card</Text>
						</Button>
					</View>
					{this.props.loader ? this.showLoaderModal() : null}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		userEmail: state.rider.user.email,
		loader: state.rider.rideCardPayment.addCardLoader
	};
}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		addCard: (data1, data2) => dispatch(addCard(data1, data2))
	};
}

export default connect(mapStateToProps, bindActions)(CreditCardq);
