import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
	Content,
	Text,
	ListItem,
	Button,
	Body,
	Right,
	Container,
	Header,
	Left,
	Icon,
	Title,
	Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

import commonColor from "../../../../native-base-theme/variables/commonColor";
import { payment } from "../../../actions/payment/riderCardPayment";
import ModalView from "../../common/ModalView";

import styles from "./styles";

class PaymentConfirm extends Component {
	onSubmitConfirm() {
		const paymentDetails = {
			email: this.props.userEmail,
			amount: this.props.data.amount
		};
		this.props.payment(paymentDetails);
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
			<Container>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
				>
					<Left>
						<Button transparent onPress={() => Actions.pop()}>
							<Icon
								name="md-arrow-back"
								style={{ fontSize: 28, marginLeft: 5, color: commonColor.brandPrimary }}
							/>
						</Button>
					</Left>
					<Body>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Confirm Payment
						</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<ListItem style={{ top: 20, flex: 1 }}>
						<Left style={{ flex: 1 }}>
							<Text style={{ fontWeight: "bold", fontSize: 20 }}>Amount</Text>
						</Left>
						<Right style={{ flex: 1 }}>
							<Text style={{ fontWeight: "bold", fontSize: 20 }}>${this.props.data.amount}</Text>
						</Right>
					</ListItem>
					<Button style={{ left: 130, top: 50 }} onPress={() => this.onSubmitConfirm()}>
						<Text> Confirm </Text>
					</Button>
					{this.props.loader ? this.showLoaderModal() : null}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		userEmail: state.rider.user.email,
		loader: state.rider.rideCardPayment.loadSpinner
	};
}

function bindActions(dispatch) {
	return {
		payment: data => dispatch(payment(data))
	};
}

export default connect(mapStateToProps, bindActions)(PaymentConfirm);
