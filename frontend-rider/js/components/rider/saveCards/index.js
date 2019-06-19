import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, TouchableOpacity } from "react-native";
import {
  Text,
  List,
  Item,
  ListItem,
  Button,
  Body,
  CheckBox,
  Right,
  Container,
  Header,
  Left,
  Icon,
  Title,
  Spinner
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import ModalView from "../../common/ModalView";
import { setActiveLogin } from "../../../actions/common/entrypage";
import { updateCardDetails, removeCard } from "../../../actions/payment/riderCardPayment";
import commonColor from "../../../../native-base-theme/variables/commonColor";

import styles from "./styles";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1
    };
    this.checkbox = this.checkbox.bind(this);
  }
  checkbox(index) {
    if (this.state.index === index) {
      this.setState({ index: -1 });
    } else {
      this.setState({ index });
    }
  }

  onRemove(key) {
    const cardDetails = {
      email: this.props.userEmail,
      fingerprint: this.props.cardDetails[key].fingerprint
    };
    this.props.removeCard(cardDetails);
  }

  onSubmitPay() {
    if (this.state.index === -1) {
      alert("Check One of the card");
    } else {
      const updatedCard = {
        email: this.props.userEmail,
        fingerprint: this.props.cardDetails[this.state.index].fingerprint
      };
      this.props.updateCardDetails(updatedCard);
    }
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  showCards() {
    return (
      <View style={{ padding: 10, flex: 1 }} bounces={false} >
        <List>
          {this.props.cardDetails.map((item, index) => {
            return (
              <ListItem key={index}>
                <Left>
                  <CheckBox
                    checked={this.state.index === index ? true : false}
                    onPress={() => this.checkbox(index)}
                  />
                  <View style={{ left: 5, flexDirection: "row" }}>
                    <Text style={{ color: "#000" }}>
                      ************{item.last4} |
                    </Text>
                    <Text style={{ color: "#000" }}>
                      {item.brand}
                    </Text>
                  </View>
                </Left>
                <Right style={{ marginTop: 15 }}>
                  <Text />
                  <TouchableOpacity onPress={() => this.onRemove(index)}>
                    <Text note style={{ fontWeight: "bold" }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                  <Item style={{ borderWidth: 1, width: "60%" }} />
                </Right>
              </ListItem>
            );
          })}
        </List>
        <TouchableOpacity
          style={{ top: 15, left: 230 }}
          onPress={() => Actions.creditCardq({ type: ActionConst.REPLACE })}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "#000" }}>
            Add New Card{" "}
          </Text>
        </TouchableOpacity>
        <View>
          <Button
            style={{ top: 50, justifyContent: 'center', alignSelf: 'center' }}
            onPress={() => this.onSubmitPay()}
          >
            <Text>Process Card</Text>
          </Button>
        </View>
        {this.props.removeCardLoader || this.props.updateCardLoader
          ? this.showLoaderModal()
          : null}
      </View>
    );
  }
  noCards() {
    return (
      <View style={{ alignItems: "center", top: 20 }}>
        <Text style={{ color: "#000", fontSize: 17 }}>
          No card added to pay
        </Text>
        <Body style={{ top: 50 }}>
          <Button
            style={{ width: 150, justifyContent: "center" }}
            onPress={() => Actions.creditCardq({ type: ActionConst.REPLACE })}
          >
            <Text>Add New Card</Text>
          </Button>
        </Body>
      </View>
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
                style={{
                  fontSize: 28,
                  marginLeft: 5,
                  color: commonColor.brandPrimary
                }}
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
              Payment
            </Title>
          </Body>
          <Right />
        </Header>
        {(this.props.cardDetails ) ? this.showCards() : this.noCards()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.rider.user.email,
    cardDetails: state.rider.rideCardPayment.cardDetails.data,
    removeCardLoader: state.rider.rideCardPayment.removeCardLoader,
    updateCardLoader: state.rider.rideCardPayment.updateCardLoader
  };
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    removeCard: data => dispatch(removeCard(data)),
    updateCardDetails: data => dispatch(updateCardDetails(data))
  };
}

export default connect(mapStateToProps, bindActions)(Payment);
