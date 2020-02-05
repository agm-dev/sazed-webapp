import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line
import $ from 'jquery';
// eslint-disable-next-line
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import configureStore from "./store/store";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
