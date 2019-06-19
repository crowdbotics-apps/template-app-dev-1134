import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
import { Text, Button, Body, Right, Container, Header, Left, Title } from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import _ from "lodash";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";

class PaymentDetails extends Component {
	render() {
		return (
			<Container>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
				>
					<Left />
					<Body>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Payment Status
						</Title>
					</Body>
					<Right />
				</Header>
				<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
					<Text>{_.get(this.props.paymentData, "message", "")}</Text>
					<Button
						style={{ alignSelf: "center", marginTop: 20 }}
						onPress={() => Actions.rootView({ type: ActionConst.REPLACE })}
					>
						<Text>Go Back To Home</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		userEmail: state.rider.user.email,
		loader: state.rider.rideCardPayment.loadSpinner,
		paymentData: state.rider.rideCardPayment.paymentData
	};
}

function bindActions(dispatch) {
	return {
		payment: data => dispatch(payment(data))
	};
}

export default connect(mapStateToProps, bindActions)(PaymentDetails);
