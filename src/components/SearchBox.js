import React from "react";
import { connect } from "react-redux";
import { getCustomers } from "../services/api";
import { getTokenFromUrl, getTokenFromStorage } from "../services/token";
import { setCustomers } from "../store/actions";

class SearchBox extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
    this.timer = null;
    this.onTyping = this.onTyping.bind(this);
  }

  async onTyping (e) {
    const searchText = e.target.value;
    console.log("typing: ", searchText);
    this.setState({ searchText });

    clearInterval(this.timer);
    this.timer = setTimeout(async function () {
      const token = getTokenFromUrl() || getTokenFromStorage();
      const customers = await getCustomers(this.props.apiBaseUrl, token, searchText);
      console.log('[customers] api response: ', customers);
      this.props.setCustomers(customers);
    }.bind(this), 200);
  }

  render () {
    return (
      <div className="form-group">
        <label htmlFor="searchCustomers">Buscar paciente:</label>
        <input
          id="searchCustomers"
          className="form-control"
          type="text"
          aria-describedby="searchCustomersHelp"
          placeholder="Nombre, apellidos, DNI, etc..."
          value={this.state.searchText}
          onChange={this.onTyping}
        />
        <small id="searchCustomersHelp" className="form-text text-muted">Puedes buscar pacientes por nombre, apellido, email o DNI.</small>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiBaseUrl: state.apiBaseUrl,
  accessToken: state.accessToken,
});

const mapDispatchToProps = dispatch => ({
  setCustomers: value => dispatch(setCustomers(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
