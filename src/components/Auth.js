import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setAccessToken, setAuthenticated, setUser } from "../store/actions";
import { getTokenFromUrl } from "../services/token";
import { getUserInfo } from "../services/api";

const Auth = (props) => {
  const {
    setAccessToken,
    setAuthenticated,
    setUser,
    apiBaseUrl,
    authenticated,
    accessToken
  } = props;

  const token = getTokenFromUrl();

  const connect = async () => {
    if (accessToken !== token || !authenticated) {
      const user = await getUserInfo(apiBaseUrl, token);
      if (user.id) {
        setUser(user);
        setAccessToken(token);
        setAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    connect();
  });

  return (
    <>
      {
        props.authenticated
        ? props.children
        : (
          <div className="login">
            <a href="http://localhost:3000/api/auth/google" >Login</a>
          </div>
        )
      }
    </>
  );
}

const mapStateToProps = state => ({
  apiBaseUrl: state.apiBaseUrl,
  accessToken: state.accessToken,
  authenticated: state.authenticated,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: value => dispatch(setAccessToken(value)),
  setAuthenticated: value => dispatch(setAuthenticated(value)),
  setUser: value => dispatch(setUser(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
