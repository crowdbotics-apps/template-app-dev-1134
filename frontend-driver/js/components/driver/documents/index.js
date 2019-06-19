import React, { Component } from "react";
import { View, Platform, FlatList } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Title,
  Left,
  Right,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

class Documents extends Component {
  navigate(key, name) {
    Actions.uploadFiles({ keys: key, Filename: name });
  }
  documentTypes = [
    {
      name: "Drivers License-Front",
      key: "licence"
    },
    {
      name: "Contact Carriage Permit",
      key: "permit"
    },
    {
      name: "Motor Insurance Certificate",
      key: "insurance"
    },
    {
      name: "Certificate of Registration",
      key: "registration"
    }
  ];
  renderArrow() {
    return (
      <Icon
        name="ios-arrow-forward"
        style={{
          ...styles.textColor,
          color: "#aaa",
          fontWeight: "bold",
          fontSize: 22
        }}
      />
    );
  }
  renderCheck() {
    return (
      <Icon
        name="checkmark"
        style={{
          ...styles.textColor,
          color: "#00C15E",
          fontWeight: "bold",
          fontSize: 22
        }}
      />
    );
  }

  renderIcon(key) {
    if (key === "licence") {
      return this.props.userDetails.licenceUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === "insurance") {
      return this.props.userDetails.insuranceUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === "permit") {
      return this.props.userDetails.vechilePaperUrl
        ? this.renderCheck()
        : this.renderArrow();
    } else if (key === "registration") {
      return this.props.userDetails.rcBookUrl
        ? this.renderCheck()
        : this.renderArrow();
    }
  }
  renderRow = ({ item }) => {
    return (
      <ListItem
        style={styles.listcustom}
        onPress={() => this.navigate(item.key, item.name)}
      >
        <View style={styles.listContainer}>
          <View style={styles.lextText}>
            <Text style={styles.textColor}>{item.name}</Text>
          </View>

          <View style={styles.rightText}>{this.renderIcon(item.key)}</View>
        </View>
      </ListItem>
    );
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          iosBarStyle="dark-content"
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          <Left />
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Documents
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#f2f4f6" }}>
          <Text style={styles.headerTitle}>Documents </Text>
          <FlatList
            data={this.documentTypes}
            renderItem={this.renderRow}
            style={{ borderTopWidth: 2, borderTopColor: "#ddd" }}
          />
        </Content>
        <Button
          full
          disabled={
            !(
              this.props.userDetails.licenceUrl &&
              this.props.userDetails.insuranceUrl &&
              this.props.userDetails.vechilePaperUrl &&
              this.props.userDetails.rcBookUrl
            )
          }
          style={styles.buttonContinue}
          onPress={() => Actions.licenceDetails()}
        >
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Continue
          </Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}

export default connect(mapStateToProps, null)(Documents);
