import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import drawer from "./drawer";
import driver from "./driver";
import entrypage from "./entrypage";
import network from "./network";
import basicAppConfig from "./basicAppConfig";
import viewStore from "./viewStore";

export default combineReducers({
  drawer,
  entrypage,
  form,
  driver,
  network,
  basicAppConfig,
  viewStore
});
