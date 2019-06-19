import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, View, Dimensions, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Header, Content, Text, Button, Icon, Card, CardItem, Title, Left, Right, Body } from "native-base";
import commonColor from "../../../../native-base-theme/variables/commonColor";

import styles from "./styles";

class Notifications extends Component {
	render() {
		return (
			<Container style={{ backgroundColor: "#fff" }}>
				<Header
					androidStatusBarColor={commonColor.statusBarLight}
					style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
				>
					<Left>
						<Button transparent onPress={() => Actions.pop()}>
							<Icon name="md-arrow-back" style={{ fontSize: 28, color: commonColor.brandPrimary }} />
						</Button>
					</Left>
					<Body>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderText : styles.aHeaderText}>
							Notifications
						</Title>
					</Body>
					<Right />
				</Header>
				<Content style={styles.container}>
					<Text style={styles.contentHeading}>IN CASE YOU DIDN'T KNOW</Text>
					<View style={{ padding: 20 }}>
						<Card>
							<CardItem cardBody>
								<Image
									source={require("../../../../assets/images/taxi1.jpg")}
									style={{
										...styles.notCard,
										resizeMode: "cover",
										height: 200,
										width: null,
										flex: 1
									}}
								/>
							</CardItem>
						</Card>
					</View>
					<View style={{ padding: 20, paddingTop: 0 }}>
						<Card>
							<CardItem cardBody>
								<Image
									source={require("../../../../assets/images/taxi2.jpg")}
									style={{
										...styles.notCard,
										resizeMode: "cover",
										height: 200,
										width: null,
										flex: 1
									}}
								/>
							</CardItem>
						</Card>
					</View>
					<View style={{ padding: 20, paddingTop: 0, paddingBottom: 30 }}>
						<Card>
							<CardItem cardBody style={{ justifyContent: "center" }}>
								<Left>
									<View
										style={{
											backgroundColor: commonColor.lightThemePlaceholder,
											flex: 1
										}}
									>
										<Text style={styles.shareText}>SHARE AND SAVE</Text>
									</View>
								</Left>
							</CardItem>
						</Card>
					</View>
				</Content>
			</Container>
		);
	}
}
export default connect()(Notifications);
