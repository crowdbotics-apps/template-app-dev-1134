import React, { Component } from "react";
import { Platform } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import CarDetailsForm from "./form";
class CarDetails extends Component {
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
              <Icon
                name="md-arrow-back"
                style={{ fontSize: 28, color: commonColor.brandPrimary }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Car Details
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <CarDetailsForm />
        </Content>
      </Container>
    );
  }
}

export default CarDetails;
