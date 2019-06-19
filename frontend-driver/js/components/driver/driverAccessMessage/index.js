import React, { Component } from "react";
import { Platform } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Title,
  Body
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";


class DriverAccessMessage extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Body>
            <Title
              style={
                Platform.OS === "ios" ? (
                  styles.iosHeaderTitle
                ) : (
                    styles.aHeaderTitle
                  )
              }
            >
              Registration Approval
            </Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: "#f2f4f6" }}>
          <Text style={styles.verifyText}>
            Your account will be updated in next 24Hrs.
          </Text>
        </Content>
        <Button
          block
          style={styles.buttonContinue}
          onPress={() => Actions.login({ type: ActionConst.RESET })}
        >
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>Back</Text>
        </Button>
      </Container>
    );
  }
}

export default DriverAccessMessage;
