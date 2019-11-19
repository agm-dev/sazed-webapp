import React from "react";
import { connect } from "react-redux";
import { getCustomers } from "../services/api";
import { getTokenFromUrl, getTokenFromStorage } from "../services/token";
import { setCustomers } from "../store/actions";




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
      <>
        <h1>Pacientes</h1>
        {this.props.customers.map(i => <p key={i.id}>{i.firstname}</p>)}
      </>
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
