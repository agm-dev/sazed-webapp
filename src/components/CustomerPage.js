import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  customers: state.customers,
});

const CustomerPage = ({ nif, customers }) => {
  console.log('DEBUG: ', customers);
  const customer = customers.find(i => i.nif === nif);
  console.log('customer: ', customer);
  return (
    <pre>{JSON.stringify(customer, null, 2)}</pre>
  );
};

export default connect(mapStateToProps)(CustomerPage);
