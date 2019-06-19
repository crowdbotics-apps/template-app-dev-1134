import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Text, Button, Icon, Title, Left, Right, Body, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { saveCardDetails } from '../../../actions/payment/riderCardPayment';
import { updatePayment } from '../../../actions/payment/paymentMethod';
import { closeDrawer } from '../../../actions/drawer';
import ModalView from '../../common/ModalView';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

class cardPayment extends Component {
	onSubmit() {
		const userEmail = {
			email: this.props.userEmail,
		};
		this.props.saveCardDetails(userEmail);
	}

	selectCash() {
		this.props.updatePayment('CASH');
	}

	// UNSAFE_componentWillMount() {
	// 	this.props.closeDrawer();
	// }

	showLoaderModal() {
		return (
			<ModalView>
				<Spinner />
			</ModalView>
		);
	}
	render() {
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
				>
					<Left>
						<Button transparent onPress={() => Actions.pop()}>
							<Icon name="md-arrow-back" style={{ fontSize: 28, color: commonColor.brandPrimary }} />
						</Button>
					</Left>
					<Body>
						<Title style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Payment
						</Title>
					</Body>
					<Right />
				</Header>
				<View>
					<View style={styles.cardSelect}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9BA2A7' }}>
							Select how you would like to pay
						</Text>
					</View>
					<View style={{ paddingHorizontal: 20 }}>
						{this.props.appConfig.stripe ? (
							<TouchableOpacity
								style={{
									...styles.payCard,
									borderTopLeftRadius: 4,
									borderTopRightRadius: 4,
									borderBottomWidth: 0.5,
									borderBottomColor: '#eee',
								}}
								onPress={() => this.onSubmit()}
							>
								<Icon name="ios-card" style={{ fontSize: 40, color: '#eee' }} />
								<Text
									style={{
										marginLeft: 20,
										marginTop: 8,
										color: '#eee',
										fontWeight: 'bold',
									}}
								>
									Credit/Debit Card
								</Text>
							</TouchableOpacity>
						 ) : null}
						{this.props.appConfig.cash ? (
							<TouchableOpacity
								style={{
									...styles.payCard,
									borderBottomLeftRadius: 4,
									borderBottomRightRadius: 4,
								}}
								onPress={() => this.selectCash()}
							>
								<Icon name="ios-cash" style={{ fontSize: 40, color: '#eee' }} />
								<Text
									style={{
										marginLeft: 20,
										marginTop: 8,
										color: '#eee',
										fontWeight: 'bold',
									}}
								>
									Cash
								</Text>
							</TouchableOpacity>
						) : null}
						{ this.props.ridePayment.cardDetailsLoader ? this.showLoaderModal() : null} 
					</View>
				</View>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		userEmail: state.rider.user.email,
		ridePayment: state.rider.rideCardPayment,
		appConfig: state.basicAppConfig.config,
	};
}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		closeDrawer: () => dispatch(closeDrawer()),
		saveCardDetails: data => dispatch(saveCardDetails(data)),
		updatePayment: data => dispatch(updatePayment(data)),
		
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(cardPayment);
