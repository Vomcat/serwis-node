import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { add } from "../../actions/users";
import PropTypes from "prop-types";

const NewUser = ({ setAlert, add, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    status: "",
  });

  const {
    name,
    first_name,
    last_name,
    email,
    password,
    password2,
    status,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Hasła powinnny być takie same", "danger");
    } else {
      add({ formData, history });
    }
  };
  return (
    <Fragment>
      <div className="container container--flex ">
        <div className="form-body form-login">
          <div className="text-center">
            <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
              <div className="form-items-wrapper">
                <h1 className="form-heading">Dodaj użytkownika</h1>
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=" Nazwa użytkownika"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="Imię"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Nazwisko"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" Email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  placeholder="Powtórz hasło"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <div className="form-group">
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => onChange(e)}
                    className="select-css"
                  >
                    <option value="0">Rodzaj użytkownika</option>
                    <option value="true">Admin</option>
                    <option value="false"> User</option>
                  </select>
                </div>
              </div>
              <div className="form-items-wrapper">
                <input type="submit" className="btn btn--green" value="Dodaj" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NewUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { setAlert, add })(NewUser);
