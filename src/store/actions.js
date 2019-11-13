import types from "./action.types";
import { storage } from "../config/vars";
import { set } from "../services/storage";

export const setConnection = payload => {
  set(storage.apiBaseUrlKey, payload);
  return { type: types.CONNECT_TO_API, payload };
};

export const setConnected = payload => ({ type: types.CONNECTED, payload });

export const setAccessToken = payload => ({ type: types.ACCESS_TOKEN, payload });

export const setAuthenticated = payload => ({ type: types.AUTHENTICATED, payload });
