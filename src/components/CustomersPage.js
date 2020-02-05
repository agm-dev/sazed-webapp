import React from "react";
import { connect } from "react-redux";
import { getCustomers } from "../services/api";
import { getTokenFromUrl, getTokenFromStorage } from "../services/token";
import { setCustomers } from "../store/actions";
import SearchBox from "./SearchBox";
import CustomersList from "./CustomersList";

class CustomersPage extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.customers.length) {
      const token = getTokenFromUrl() || getTokenFromStorage();
      const customers = await getCustomers(this.props.apiBaseUrl, token);
      console.log('[customers] api response: ', customers);
      this.props.setCustomers(customers);
    }
  }

  render () {
    return (
      <div className="col align-self-center">
        <h1>Pacientes</h1>
        <p>Desde aquí puedes buscar pacientes y acceder a sus detalles, o añadir nuevos.</p>
        <SearchBox />
        <CustomersList customers={this.props.customers} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiBaseUrl: state.apiBaseUrl,
  accessToken: state.accessToken,
  customers: state.customers,
});

const mapDispatchToProps = dispatch => ({
  setCustomers: value => dispatch(setCustomers(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
