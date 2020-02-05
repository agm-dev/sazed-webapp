import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import SessionsPage from "./SessionsPage";
import CustomersPage from "./CustomersPage";
import CustomerPage from "./CustomerPage";

function Routes () {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a className="navbar-brand" href="#">Sazed</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Activa o desactiva el menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/sessions">Citas</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/customers">Pacientes</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <div className="container" style={{marginTop: '10px'}}>
        <div className="row align-items-center">
          <Switch>
            <Route path="/sessions">
              <SessionsPage />
            </Route>
            <Route path="/customers/:nif" render={({ match }) => (
              <CustomerPage nif={match.params.nif}/>
            )}/>
            <Route path="/customers">
              <CustomersPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
