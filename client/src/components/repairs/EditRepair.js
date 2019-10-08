import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addNewRepair } from "../../actions/repairs";
import { getRepair } from "../../actions/repairs";
import axios from "axios";

const EditRepair = ({
  auth,
  repair: { repair, loading },
  getRepair,
  updaterepair,
  history,
  match
}) => {
  const [formData, SetFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    device: "",
    code: "",
    imei: "",
    description: "",
    cost: ""
  });

  useEffect(() => {
    getRepair(match.params.id);
    console.log("naprawa22222", match.params.id);
    SetFormData({
      first_name: loading || !repair.first_name ? "" : repair.first_name,
      last_name: loading || !repair.last_name ? "" : repair.last_name,
      phone_number: loading || !repair.phone_number ? "" : repair.phone_number,
      email: loading || !repair.email ? "" : repair.email,
      device: loading || !repair.device ? "" : repair.device,
      code: loading || !repair.code ? "" : repair.code,
      imei: loading || !repair.imei ? "" : repair.imei,
      description: loading || !repair.description ? "" : repair.description,
      cost: loading || !repair.cost ? "" : repair.cost
    });
  }, [getRepair, match.params.id]);

  const {
    first_name,
    last_name,
    phone_number,
    email,
    device,
    code,
    imei,
    description,
    cost,
    status
  } = formData;

  const onChange = e =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const upUser = {
      first_name,
      last_name,
      phone_number,
      email,
      device,
      code,
      imei,
      description,
      cost,
      status
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = upUser;
      const res = await axios.put(
        "/api/repairs/" + match.params.id,
        body,
        config
      );

      history.push("/repairs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container text-center title">
        <h1>Edytuj naprawę</h1>
      </div>

      <div className="container">
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Imie</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={first_name}
                placeholder="Imie"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={last_name}
                placeholder="Nazwisko"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Numer telefonu</label>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={phone_number}
                placeholder="500300330"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder=" Email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Nazwa urządzenia</label>
              <input
                type="text"
                className="form-control"
                name="device"
                value={device}
                placeholder="Nazwa"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Numer seryjny / Imei</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={code}
                placeholder="Kod blokady"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Kod Blokady</label>
              <input
                type="text"
                className="form-control"
                name="imei"
                value={imei}
                placeholder="Imei/Numer seryjny"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="exampleFormControlTextarea1">Opis Usterki</label>
              <textarea
                className="form-control"
                name="description"
                value={description}
                rows="3"
                onChange={e => onChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Koszt naprawy</label>
              <input
                type="text"
                className="form-control"
                name="cost"
                value={cost}
                placeholder="cena"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Status naprawy</label>
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={e => onChange(e)}
                required
              >
                <option value="0">Wybierz status naprawy</option>
                <option value="Otwarta">Otwarta</option>
                <option value="Reklamacja"> Reklamacja</option>
                <option value="Gwaracnja">Gwaracnja</option>
                <option value="Zakończona">Zakończona</option>
              </select>
            </div>
          </div>
          <div className="btn-group mr-2"></div>
          <input
            type="submit"
            value="zapisz"
            className="btn btn-primary my-1 btn-lg btn-block"
          />
        </form>
      </div>
    </Fragment>
  );
};

EditRepair.propTypes = {
  getRepair: PropTypes.func.isRequired,
  addNewRepair: PropTypes.func.isRequired,

  repair: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  repair: state.repairs
});

export default connect(
  mapStateToProps,
  { addNewRepair, getRepair }
)(EditRepair);
