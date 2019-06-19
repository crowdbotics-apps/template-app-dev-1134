import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import drawer from "./drawer";
import rider from "./rider";
import entrypage from "./entrypage";
import viewStore from "./viewStore";
import network from "./network";
import basicAppConfig from "./basicAppConfig";

export default combineReducers({
  drawer,
  entrypage,
  form,
  network,
  rider,
  viewStore,
  basicAppConfig
});
