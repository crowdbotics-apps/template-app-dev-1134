import { Modal, View, Text } from "react-native";
import React, { Component } from "react";
import Styles from "./style";


class ModalView extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent
          onRequestClose={() => console.log("Modal Closed")}
        >
          <View style={Styles.modalView}>
            {this.props.children}
          </View>
        </Modal>
      </View>
    );
  }
}

export default ModalView;
