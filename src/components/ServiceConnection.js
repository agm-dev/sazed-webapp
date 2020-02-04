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
    <>
      {
        props.connected
        ? props.children
        : (
          <div className="container">
            <div className="row align-items-center" style={{marginTop: '20px'}}>
              <div className="col align-self-center">
                <h1>Conexión</h1>
                <div className="form-group">
                  <label for="apiUrl">API url:</label>
                  <input
                    id="apiUrl"
                    className="form-control"
                    type="text"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                    aria-describedby="apiUrlHelp"
                    placeholder="Introduce la URL del servicio sazed"
                  />
                  <small id="apiUrlHelp" class="form-text text-muted">Esta aplicación necesita conectarse a un servicio "sazed" para funcionar.</small>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" onClick={checkServiceConnection}>Conectar</button>
                </div>
                <div className="form-group">
                  <p>{errorMessage}</p>
                </div>
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
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  setConnected: value => dispatch(setConnected(value)),
  setConnection: value => dispatch(setConnection(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceConnection);
