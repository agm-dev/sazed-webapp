import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCustomer } from "../services/api"

const mapStateToProps = state => ({
  customers: state.customers,
  token: state.accessToken,
  apiBaseUrl: state.apiBaseUrl,
});

const CustomerPage = ({ nif, customers, editable = false, apiBaseUrl, token }) => {
  console.log('DEBUG: ', customers);

  const customer = customers.find(i => i.nif === nif);
  console.log('customer: ', customer);

  const [edit, setEdit] = useState(editable)
  const [dni, setDni] = useState(customer.nif || "")
  const [firstname, setFirstname] = useState(customer.firstname || "")
  const [lastname, setLastname] = useState(customer.lastname || "")
  const [phone, setPhone] = useState(customer.phone)
  const [email, setEmail] = useState(customer.email)
  const [birthdate, setBirthdate] = useState(customer.birthdate)
  const [notes, setNotes] = useState(customer.notes || "")
  const [lgpd, setLgpd] = useState(customer.LGPD)

  const formatDate = d => {
    const date = new Date(d)
    const getTwoDigits = value => value < 10 ? `0${value}` : value;
    const day = getTwoDigits(date.getDate());
    const month = getTwoDigits(date.getMonth() + 1); // add 1 since getMonth returns 0-11 for the months
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const editHandler = e => {
    e.preventDefault()
    setEdit(true)
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log("GUARDAR: ", customer)

    const data = {
      id: customer.id,
      nif,
      firstname,
      lastname,
      phone: Number(phone),
      email,
      birthdate,
      LGPD: lgpd,
    }

    if (notes.length) {
      data.notes = notes
    }

    console.log("new data", data)

    updateCustomer(apiBaseUrl, token, data)
      .then(res => console.log("updateCustomer response: ", res))
  }

  return (
    <div className="col align-self-center">
      <form>
        <div className="form-group">
          <label htmlFor="nif">DNI:</label>
          <input
            id="nif"
            type="text"
            value={dni}
            onInput={e => setDni(e.target.value)}
            className="form-control"
            aria-describedby="nifHelp"
            placeholder="Introduce el DNI del paciente"
            required
            disabled={!edit}
          />
          <small id="nifHelp" className="form-text text-muted">Este valor debe ser único</small>
        </div>

        <div className="form-group">
          <label htmlFor="firstname">Nombre: *</label>
          <input
            id="firstname"
            type="text"
            value={firstname}
            onInput={e => setFirstname(e.target.value)}
            className="form-control"
            placeholder="Introduce el nombre del paciente"
            required
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Apellidos:</label>
          <input
            id="lastname"
            type="text"
            value={lastname}
            onInput={e => setLastname(e.target.value)}
            className="form-control"
            placeholder="Introduce el nombre del paciente"
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onInput={e => setPhone(e.target.value)}
            className="form-control"
            placeholder="Número de teléfono de contacto"
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onInput={e => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email de contacto"
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">Fecha de nacimiento:</label>
          <input
            id="birthdate"
            type="date"
            value={formatDate(birthdate)}
            onInput={e => setBirthdate(e.target.value)}
            className="form-control"
            placeholder="Fecha de nacimiento"
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Anotaciones:</label>
          <textarea
            id="notes"
            value={notes}
            onInput={e => setNotes(e.target.value)}
            placeholder="Anotaciones..."
            className="form-control"
            disabled={!edit}
          ></textarea>
        </div>

        <div className="form-check">
          <input
            id="lgpd"
            type="checkbox"
            checked={lgpd}
            onChange={e => setLgpd(e.target.checked)}
            className="form-check-input"
            disabled={!edit}
          />
          <label htmlFor="lgpd" className="form-check-label">El paciente ha aceptado la política sobre LGPD.</label>
        </div>

        {!edit && (
          <button
            className="btn btn-primary"
            onClick={editHandler}
          >Editar</button>
        )}

        {edit && (
          <button
            className="btn btn-primary"
            onClick={submitHandler}
          >Guardar</button>
        )}
      </form>
    </div>
  )
};

export default connect(mapStateToProps)(CustomerPage);
