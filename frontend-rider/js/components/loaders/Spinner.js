import React, {Component} from "react";
import {Spinner} from "native-base";

export default class SpinnerNB extends Component {
  render() {
    return <Spinner {...this.props} />;
  }
}
