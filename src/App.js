import React from 'react';
import logo from './logo.svg';
import './App.css';

import ServiceConnection from "./components/ServiceConnection";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <ServiceConnection>
        <Routes />
      </ServiceConnection>
    </div>
  );
}

export default App;
