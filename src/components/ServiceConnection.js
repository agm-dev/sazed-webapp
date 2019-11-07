import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setConnection, setConnected } from "../store/actions";
import { serviceIsUp } from "../services/api";

const ServiceConnection = (props) => {
  const { setConnected, setConnection, apiBaseUrl } = props;
  const [url, setUrl] = useState(apiBaseUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const defaultErrorMessage = "No hay api a la que conectar ahí :(";

  const checkServiceConnection = async () => {
    console.log("url: ", url);
    try {
      const connected = await serviceIsUp(url);
      setConnected(connected);
      if (connected) {
        console.log('set connection!!!', connected);
        setErrorMessage("");
        setConnection(url);
      } else {
        setUrl("");
        setErrorMessage(defaultErrorMessage);
      }
    } catch (err) {
      console.error("error on checking service connection: ", err);
      setErrorMessage(defaultErrorMessage);
    }
  }

  /**
   * This makes the function to be executed only the very first time
   * the component is rendered, and not every time url changes.
   */
  useEffect(() => {
    checkServiceConnection();
  }, []); // TODO: // FIXME: investigate about this warning

  return (
    <div className="service-connection">
      {
        props.connected
        ? props.children
        : (
          <div className="service-connection__disconnected">
            <input type="text" value={url} onChange={event => setUrl(event.target.value)}/>
            <button onClick={checkServiceConnection}>Connect</button>
            <p>{errorMessage}</p>
          </div>
        )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  apiBaseUrl: state.apiBaseUrl,
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  setConnected: value => dispatch(setConnected(value)),
  setConnection: value => dispatch(setConnection(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceConnection);
