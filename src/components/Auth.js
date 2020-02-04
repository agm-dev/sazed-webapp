import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setAccessToken, setAuthenticated, setUser } from "../store/actions";
import { getTokenFromUrl, getTokenFromStorage } from "../services/token";
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

  const token = getTokenFromUrl() || getTokenFromStorage();

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
  }, []);

  return (
    <>
      {
        props.authenticated
        ? props.children
        : (
          <div className="container">
            <div className="row align-items-center" style={{marginTop: '20px'}}>
              <div className="col align-self-center">
                <h1>Iniciar sesión</h1>
                <p>Necesitas estar registrado e iniciar sesión con tu cuenta de usuario para utilizar la aplicación.</p>
                <a className="btn btn-primary" href={`${apiBaseUrl}/api/auth/google`}>Iniciar sesión</a>
              </div>
            </div>
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
