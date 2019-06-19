import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Content, Button, Icon, Title, Left, Right, Body } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import LicenceForm from "./form";

class LicenceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submit: false,
			image: null
		};
	}
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
					<Body style={{ flex: 3 }}>
						<Title style={Platform.OS === "ios" ? styles.iosHeaderTitle : styles.aHeaderTitle}>
							Licence Details
						</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<LicenceForm />
				</Content>
			</Container>
		);
	}
}

export default LicenceDetails;
