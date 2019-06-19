import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Modal, Platform, Alert } from "react-native";
import PropTypes from "prop-types";
import { Header, Text, Button, Icon, Card, CardItem, Thumbnail, Left, Right, Body, Title } from "native-base";
import _ from "lodash";
import { clearReducerState, setRating } from "../../../actions/driver/rateRider";
import { changePageStatus } from "../../../actions/driver/home";

import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

function mapStateToProps(state) {
	return {
		trip: state.driver.trip,
		tripRequest: state.driver.tripRequest,
		appConfig: state.basicAppConfig.config
	};
}
class RateRider extends Component {
	static propTypes = {
		changePageStatus: PropTypes.func,
		clearReducerState: PropTypes.func,
		trip: PropTypes.object,
		tripRequest: PropTypes.object,
		setRating: PropTypes.func
	};
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true,
			stars: [{ active: false }, { active: false }, { active: false }, { active: false }, { active: false }]
		};
	}
	componentDidMount() {
		const that = this;
		setTimeout(() => {
			that.setState({
				visible: true
			});
		}, 500);
		setTimeout(() => {
			that.setState({
				opacity: 0
			});
		}, 900);
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.tripRequest.tripRequestStatus) {
			this.props.changePageStatus("driverHome");
		}
	}
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	goBack() {
		this.props.clearReducerState();
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
	handleClick() {
		this.setModalVisible(false);
		const rating = this.computeRating();
		this.props.setRating(rating);
	}
	render() {
		if (this.props.tripRequest.tripRequestStatus === undefined) {
			return <View />;
		}
		return (
			<View
				pointerEvents="box-none"
				style={this.state.modalVisible === true ? { opacity: 0.99, flex: 1 } : { flex: 1 }}
			>
				<View
					style={{
						...styles.slideSelector,
						paddingTop: 20,
						opacity: this.state.modalVisible === true ? 0 : 0.99
					}}
				>
					<Card
						style={({ ...styles.footerCard }, { ...(Platform.OS === "ios" ? { top: -3 } : { top: -15 }) })}
					>
						<CardItem style={{ backgroundColor: "#fff" }}>
							<Left>
								<Body style={{ flexDirection: "row" }}>
									<Thumbnail
										source={{
											uri: _.get(this.props, "trip.rider.profileUrl", "")
										}}
										style={{
											width: 40,
											height: 40,
											borderRadius: 20,
											borderWidth: 1,
											borderColor: "#EEE"
										}}
									/>
									<Text style={{ alignSelf: "center", paddingLeft: 10 }}>
										{_.get(this.props, "trip.rider.fname", "Rider")}
									</Text>
								</Body>
							</Left>
						</CardItem>
						<View
							style={{
								justifyContent: "center",
								position: "absolute",
								right: 10,
								top: 0,
								bottom: 0,
								backgroundColor: "#fff"
							}}
						>
							<Text style={{ textAlign: "right" }}>
								{_.get(this.props, "trip.riderRatingByDriver", "")}{" "}
								<Icon name="ios-star" style={styles.starIcon} />
							</Text>
						</View>
					</Card>
					<Card
						style={({ ...styles.footerCard }, { ...(Platform.OS === "ios" ? { top: -3 } : { top: -10 }) })}
					>
						<CardItem style={{ backgroundColor: "#fff" }}>
							<Left>
								<Body>
									<Text style={styles.trip}>TRIP AMOUNT</Text>
									<Text note style={styles.pay}>
										{this.props.appConfig.tripPrice.currencySymbol}
										{this.props.trip.tripAmt}
									</Text>
								</Body>
							</Left>
							<Right>
								{this.props.trip.paymentMode === "CASH" ? (
									<Text
										style={{
											fontSize: 14,
											lineHeight: 16,
											color: commonColor.brandPrimary
										}}
									>
										COLLECT CASH
									</Text>
								) : (
									<Text style={{ fontSize: 14, lineHeight: 16 }}>
										{_.get(this.props, "trip.paymentStatus", "") === "error"
											? "Payment Failed"
											: "Payment Success"}
									</Text>
								)}
							</Right>
						</CardItem>
					</Card>
					<Button
						block
						style={{ height: 60, flex: 1 }}
						onPress={() => {
							this.goBack();
						}}
					>
						<Text style={styles.btnText}>DONE</Text>
					</Button>
				</View>
				<Header
					iosBarStyle="light-content"
					style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
					androidStatusBarColor={commonColor.statusBarColorDark}
				>
					<Left style={{ flex: 1 }}>
						<Button transparent onPress={() => this.goBack()}>
							<Icon name="md-arrow-back" style={{ color: "#fff", fontSize: 28 }} />
						</Button>
					</Left>
					<Body style={{ flex: 4 }}>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							TRIP COMPLETED
						</Title>
					</Body>
					<Right />
				</Header>
				<Modal
					animationType={"slide"}
					transparent
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<View style={styles.modalView}>
						<Card
							style={{
								marginBottom: -2,
								borderBottomWidth: 0.5,
								flexDirection: "row"
							}}
						>
							<CardItem style={{ ...styles.rateCard, flex: 2 }}>
								<Left>
									<Icon name="ios-person" style={styles.profileIcon} />
									<Body>
										<Text
											style={{
												color: "#31D0E2",
												fontSize: 13,
												fontWeight: "700",
												lineHeight: 14
											}}
										>
											RATE
										</Text>
										<Text
											note
											style={{
												fontSize: 15,
												fontWeight: "400",
												marginRight: 0
											}}
										>
											{_.get(this.props.trip.rider, "fname", "Rider")}
										</Text>
									</Body>
								</Left>
							</CardItem>
							<CardItem style={{ flex: 4 }}>
								<View style={styles.ratings}>
									{this.state.stars.map((item, index) => (
										<Button
											style={{ paddingRight: 6, paddingLeft: 6 }}
											transparent
											key={index}
											onPress={() => this.rate(index)}
										>
											{item.active ? (
												<Icon
													name="ios-star"
													style={{
														color: commonColor.brandPrimary
													}}
												/>
											) : (
												<Icon
													name="ios-star-outline"
													style={{
														// letterSpacing: 10,
														color: "grey"
													}}
												/>
											)}
										</Button>
									))}
								</View>
							</CardItem>
						</Card>
						<Card style={{ borderRadius: 0, borderColor: "#eee" }}>
							<CardItem style={styles.btnContainer}>
								<Button
									block
									style={{ height: 60, flex: 1 }}
									onPress={() => {
										this.handleClick();
									}}
								>
									<Text style={styles.btnText}>COMPLETE RATING</Text>
								</Button>
							</CardItem>
						</Card>
					</View>
				</Modal>
			</View>
		);
	}
}
function bindActions(dispatch) {
	return {
		clearReducerState: () => dispatch(clearReducerState()),
		changePageStatus: newPage => dispatch(changePageStatus(newPage)),
		setRating: rating => dispatch(setRating(rating))
	};
}
export default connect(mapStateToProps, bindActions)(RateRider);
