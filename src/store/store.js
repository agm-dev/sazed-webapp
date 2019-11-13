import { createStore } from "redux";
import reducer from "./reducer";
import { storage } from "../config/vars";
import { get } from "../services/storage";

const getBaseUrl = () => {
  const value = get(storage.apiBaseUrlKey);
  return value || storage.DEFAULT_API_BASE_URL;
};

const DEFAULT_STATE = {
  apiBaseUrl: getBaseUrl(),
  connected: false,
  authenticated: false,
  accessToken: get(storage.accessTokenKey) || ""
};

const configureStore = (state = DEFAULT_STATE) => createStore(reducer, state);

export default configureStore;
