import types from "./action.types";

export const setConnection = payload => ({ type: types.CONNECT_TO_API, payload });
export const setConnected = payload => ({ type: types.CONNECTED, payload });
