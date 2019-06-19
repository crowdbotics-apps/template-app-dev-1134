import React from "react";

import { Sentry } from "react-native-sentry";
import Setup from "./js/setup";


export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <Setup />;
  }
}
