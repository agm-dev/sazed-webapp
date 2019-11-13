import React from 'react';
import logo from './logo.svg';
import './App.css';

import ServiceConnection from "./components/ServiceConnection";
import Auth from "./components/Auth";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <ServiceConnection>
        <Auth>
          <Routes />
        </Auth>
      </ServiceConnection>
    </div>
  );
}

export default App;
