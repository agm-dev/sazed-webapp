import React, { useState } from "react";
import { connect } from "react-redux";
import { setConnection, setConnected } from "../store/actions";

const ServiceConnection = (props) => {
  const [url, setUrl] = useState("");

  const checkServiceConnection = () => {
    console.log('url: ', url); // TODO: continue here
  }

  return (
    <div className="service-connection">
      {
        props.connected
        ? props.children
        : (
          <div className="service-connection__disconnected">
            <input type="text" value={url} onChange={event => setUrl(event.target.value)}/>
            <button onClick={checkServiceConnection}>Connect</button>
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
  setConnected: () => dispatch(setConnected),
  setConnection: () => dispatch(setConnection)
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceConnection);
