import types from "./action.types";
import { storage } from "../config/vars";
import { set } from "../services/storage";

const setBeforeAction = (key, type) => payload => {
  set(key, payload);
  return { type, payload };
}

export const setConnection = setBeforeAction(storage.apiBaseUrlKey, types.CONNECT_TO_API);

export const setConnected = payload => ({ type: types.CONNECTED, payload });

export const setAccessToken = setBeforeAction(storage.accessTokenKey, types.ACCESS_TOKEN);

export const setAuthenticated = payload => ({ type: types.AUTHENTICATED, payload });

export const setUser = payload => ({ type: types.USER , payload });

export const setCustomers = setBeforeAction(storage.customersKey, types.CUSTOMERS);
