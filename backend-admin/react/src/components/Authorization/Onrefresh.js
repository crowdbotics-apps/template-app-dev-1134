import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Refresh = () => (
  <Route
    render={() => {
      console.log("refreshing");
      return <Redirect from="/home" to="/" />;
    }}
  />
);

export default Refresh;
