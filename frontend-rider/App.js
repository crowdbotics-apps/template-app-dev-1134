import React from "react";
import { Sentry } from "react-native-sentry";
import Setup from "./js/setup";

Sentry.config(
  "https://SENTRY_ID@sentry.io/1460151"
).install();

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <Setup />;
  }
}
