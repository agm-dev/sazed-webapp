import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAccessToken, setAuthenticated } from "../store/actions";

const Auth = (props) => {
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
  accessToken: state.accessToken,
  authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: value => dispatch(setAccessToken(value)),
  setAuthenticated: value => dispatch(setAuthenticated(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
