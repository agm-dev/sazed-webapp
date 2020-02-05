import React from "react";
import { Link } from "react-router-dom";

const capitalize = text => {
  const chars = text.split('');
  return `${chars[0].toUpperCase()}${chars.slice(1).join('')}`
}

const ListItem = ({id, nif, firstname, lastname, email }) => (
  <Link
    key={`key-${id}`}
    className="list-group-item list-group-item-action"
    to={`/customers/${nif}`}
  >{capitalize(firstname)} {capitalize(lastname)} <i>&lt;{email}&gt;</i></Link>
);

export default ({ customers }) => (
  <ul className="list-group">
    {customers.map(ListItem)}
  </ul>
);
