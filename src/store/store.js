import { createStore } from "redux";
import reducer from "./reducer";

const DEFAULT_STATE = {
  apiBaseUrl: "http://localhost:3000",
  connected: false,
};

const configureStore = (state = DEFAULT_STATE) => createStore(reducer, state);

export default configureStore;
