import React from 'react';
import './App.css';

import ServiceConnection from "./components/ServiceConnection";
import Auth from "./components/Auth";
import Routes from "./components/Routes";

function App() {
  return (
    <ServiceConnection>
      <Auth>
        <Routes />
      </Auth>
    </ServiceConnection>
  );
}

export default App;
