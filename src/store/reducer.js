import types from "./action.types";

export default (state, action) => {
  switch (action.type) {
    case types.CONNECT_TO_API:
      return { ...state, apiBaseUrl: action.payload }
    case types.CONNECTED:
      return { ...state, connected: action.payload }
    default:
      return state;
  };
};
