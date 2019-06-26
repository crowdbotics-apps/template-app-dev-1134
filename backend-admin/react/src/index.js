import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, BrowserRouter} from "react-router-dom";
import {IntlProvider, addLocaleData} from "react-intl";
import createBrowserHistory from 'history/createBrowserHistory';
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";
import fr from "react-intl/locale-data/fr";
import de from "react-intl/locale-data/de";
import zh from "react-intl/locale-data/zh";
import registerServiceWorker from "./registerServiceWorker";
import localeData from "./data.json";
import configureStore from "./redux/configure-store";
import "./index.scss";
import "./styles/bootstrap.scss";

import Routes from "./routes";

import App from "./screens/App/App";

let store = configureStore();

addLocaleData([...en, ...es, ...fr, ...de, ...zh]);
let language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;
if (language.indexOf("-") !== -1) language = language.split("-")[0];

if (language.indexOf("_") !== -1) language = language.split("_")[0];
const messages = localeData[language] || localeData.en;

const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages}>
      {/* <BrowserRouter> */}
      <Router history={history}>
        <div>
          <Routes />
          <App />
        </div>
      {/* </BrowserRouter> */}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
