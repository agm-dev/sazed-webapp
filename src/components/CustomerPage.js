import React, { useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  customers: state.customers,
});

const CustomerPage = ({ nif, customers, editable = false }) => {
  console.log('DEBUG: ', customers);

  const [edit, setEdit] = useState(editable)

  const customer = customers.find(i => i.nif === nif);
  console.log('customer: ', customer);

  const editHandler = e => {
    e.preventDefault()
    setEdit(true)
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log("GUARDAR: ", customer)
  }

  return (
    <div className="col align-self-center">
      <form>
        <div className="form-group">
          <label htmlFor="nif">DNI:</label>
          <input
            id="nif"
            type="text"
            value={customer.nif || ""}
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
            value={customer.firstname || ""}
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
            value={customer.lastname || ""}
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
            value={customer.phone}
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
            value={customer.email}
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
            value={customer.birthdate}
            className="form-control"
            placeholder="Fecha de nacimiento"
            disabled={!edit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Anotaciones:</label>
          <textarea
            id="notes"
            placeholder="Anotaciones..."
            className="form-control"
            disabled={!edit}
          >{customer.notes}</textarea>
        </div>

        <div className="form-check">
          <input
            id="lgpd"
            type="checkbox"
            checked={customer.LGPD}
            className="form-check-input"
            disabled={!edit}
          />
          <label htmlFor="lgpd" class="form-check-label">El paciente ha aceptado la política sobre LGPD.</label>
        </div>

        {!edit && (
          <button
            class="btn btn-primary"
            onClick={editHandler}
          >Editar</button>
        )}

        {edit && (
          <button
            class="btn btn-primary"
            onClick={submitHandler}
          >Guardar</button>
        )}
      </form>
    </div>
  )
};

export default connect(mapStateToProps)(CustomerPage);
