import types from "./action.types";

export default (state, action) => {
  switch (action.type) {
    case types.CONNECT_TO_API:
      return { ...state, apiBaseUrl: action.payload }
    case types.CONNECTED:
      return { ...state, connected: action.payload }
    case types.AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case types.ACCESS_TOKEN:
      return { ...state, accessToken: action.payload }
    case types.USER:
      return { ...state, user: action.payload }
    case types.CUSTOMERS:
      return { ...state, customers: action.payload }
    default:
      return state;
  };
};
