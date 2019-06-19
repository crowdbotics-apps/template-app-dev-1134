import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Platform, TextInput, Dimensions } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Container, Header, Text, Button, Icon, Title, Thumbnail, Left, Right, Body, Content } from 'native-base';

import { clearReducerState, setRating, sendReview } from '../../../actions/rider/receipt';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import { changePageStatus } from '../../../actions/rider/home';
const deviceWidth = Dimensions.get('window').width;

function mapStateToProps(state) {
	return {
		trip: state.rider.trip,
		tripRequest: state.rider.tripRequest,
		appConfig: state.basicAppConfig.config,
	};
}

class Receipt extends Component {
	static propTypes = {
		trip: PropTypes.object,
		tripRequest: PropTypes.object,
		clearReducerState: PropTypes.func,
		changePageStatus: PropTypes.func,
		setRating: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this.state = {
			review: '',
			stars: [{ active: false }, { active: false }, { active: false }, { active: false }, { active: false }],
		};
	}
	computeRating() {
		let count = 0;
		this.state.stars.forEach(item => {
			if (item.active) {
				count += 1;
			}
		});
		return count;
	}
	goBack() {
		const rating = this.computeRating();
		if (rating) {
			this.props.setRating(rating);
			this.props.sendReview(this.state.review);
			this.props.clearReducerState();
			this.props.changePageStatus('home');
		} else {
			this.props.setRating(1);
			this.props.sendReview(this.state.review);
			this.props.clearReducerState();
			this.props.changePageStatus('home');
		}
	}
	formatDate(bookingTime) {
		// eslint-disable-line class-methods-use-this
		return moment(bookingTime).format('h:mm a');
	}
	rate(index) {
		const stateCopy = { ...this.state };
		for (let i = 0; i < 5; i += 1) {
			stateCopy.stars[i].active = false;
		}
		this.setState(stateCopy);
		for (let i = index; i >= 0; i -= 1) {
			stateCopy.stars[i].active = true;
		}
		this.setState(stateCopy);
	}

	render() {
		if (!this.props.tripRequest.tripRequestStatus) {
			return <View />;
		}
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
				>
					<Left />
					<Body>
						<Title style={{ color: commonColor.brandPrimary }}>Your Trip</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<View style={{ flex: 1, alignItems: 'center' }}>
						{this.props.trip.paymentMode === 'CASH' ? (
							<View>
								<View style={styles.dateContainer}>
									<View style={styles.sideLines} />
									<Text style={styles.summaryText}>
										{this.formatDate(this.props.trip.bookingTime)}
									</Text>
									<View style={styles.sideLines} />
								</View>
								<Text style={styles.amount}>
									{this.props.appConfig.tripPrice.currencySymbol}
									{this.props.trip.tripAmt}
								</Text>
								<View style={styles.dateContainer}>
									<View style={styles.sideLines} />
									<Text style={styles.summaryText}>TRIP SUMMARY</Text>
									<View style={styles.sideLines} />
								</View>
								<Text style={{ fontSize: 26, textAlign: 'center' }}>Pay Cash</Text>
							</View>
						) : (
							<View style={{ fontSize: 26, marginTop: 15 }}>
								{_.get(this.props, 'trip.paymentStatus', '') === 'error' ? (
									<View
										style={{
											borderWidth: 1,
											width: deviceWidth - 40,
											alignSelf: 'center',
											borderColor: '#eee',
											alignItems: 'center',
											justifyContent: 'space-around',
											paddingVertical: 25,
											paddingHorizontal: 5,
											marginBottom: 10,
										}}
									>
										<FAIcon name="exclamation-circle" style={{ fontSize: 30, color: '#FF7867' }} />
										<Text
											style={{
												color: '#FF7867',
												fontSize: 20,
												textAlign: 'center',
											}}
										>
											Sorry, Unfortunately we were unable to charge your credit card. Please make
											the payment in cash.
										</Text>
										<Text style={{ ...styles.amount, color: '#FF7867' }}>
											{this.props.appConfig.tripPrice.currencySymbol}
											{this.props.trip.tripAmt}
										</Text>
									</View>
								) : (
									<View
										style={{
											borderWidth: 1,
											borderColor: '#eee',
											alignItems: 'center',
											justifyContent: 'space-around',
											paddingVertical: 25,
											paddingHorizontal: 35,
											marginBottom: 10,
										}}
									>
										<Icon
											name="ios-checkmark-circle-outline"
											style={{ color: '#3B75A3', fontSize: 40 }}
										/>
										<Text
											style={{
												color: '#3B75A3',
												fontSize: 20,
												marginBottom: 10,
											}}
										>
											Thank you for the payment!
										</Text>
										<Text style={{ ...styles.amount, fontWeight: 'bold' }}>
											{this.props.appConfig.tripPrice.currencySymbol}
											{this.props.trip.tripAmt}
										</Text>
									</View>
								)}
							</View>
						)}

						<View style={{ alignItems: 'center', marginTop: 15 }}>
							<Thumbnail
								square
								size={60}
								source={{ uri: this.props.trip.driver.profileUrl }}
								style={{ borderRadius: 30 }}
							/>
							<Text style={{ alignSelf: 'center' }}>
								{_.get(this.props.trip.driver, 'fname', 'Driver')}
							</Text>
							<View style={styles.taxiNoContainer}>
								<Text style={styles.taxiNo}>
									{_.get(this.props.trip.driver.carDetails, 'regNo', 'NYC 0071')}
								</Text>
							</View>
						</View>
						<View style={{ paddingBottom: 0 }}>
							<View style={styles.feedBackBtn}>
								{this.state.stars.map((item, index) => (
									<Button
										style={{ paddingLeft: 5, paddingRight: 5 }}
										transparent
										key={index}
										onPress={() => this.rate(index)}
									>
										{item.active ? (
											<Icon
												name="ios-star"
												style={{
													margin: 0,
													fontSize: 28,
													color: commonColor.brandPrimary,
												}}
											/>
										) : (
											<Icon
												name="ios-star-outline"
												style={{
													margin: 0,
													fontSize: 28,
													color: 'grey',
												}}
											/>
										)}
									</Button>
								))}
							</View>
							<View style={{ alignItems: 'center' }}>
								<TextInput
									style={styles.textArea}
									onChangeText={review => this.setState({ review })}
									placeholder={'Enter your feedback'}
									placeholderTextColor={commonColor.brandPrimary}
									editable
									multiline
									numberOfLines={4}
									// returnKeyType={done}
									selectionColor={commonColor.lightThemePlaceholder}
								/>
							</View>
						</View>
					</View>
				</Content>
				<View style={{ position: 'absolute', bottom: 0 }}>
					<Button
						full
						style={{
							backgroundColor: '#2E6894',
							width: deviceWidth + 5,
							height: 50,
						}}
						onPress={() => this.goBack()}
					>
						<Text style={styles.btnText}>Submit Feedback</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

function bindActions(dispatch) {
	return {
		clearReducerState: () => dispatch(clearReducerState()),
		changePageStatus: newPage => dispatch(changePageStatus(newPage)),
		sendReview: review => dispatch(sendReview(review)),
		setRating: rating => dispatch(setRating(rating)),
	};
}

export default connect(
	mapStateToProps,
	bindActions
)(Receipt);
