import React from 'react';
import './App.css';
import {
  CssBaseline,
  Container,
} from '@material-ui/core';

import ServiceConnection from "./components/ServiceConnection";
import Auth from "./components/Auth";
import Routes from "./components/Routes";

function App() {
  return (
    <>
      <CssBaseline>
        <Container maxWidth="sm">
          <ServiceConnection>
            <Auth>
              <Routes />
            </Auth>
          </ServiceConnection>
        </Container>
      </CssBaseline>
    </>
  );
}

export default App;
