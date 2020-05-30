import React, { useState, Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { editUserPassword, getUser } from "../../actions/users";
import PropTypes from "prop-types";

const ResetUserPassword = ({
  user: { user, loading },
  setAlert,
  editUserPassword,
  getUser,
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Hasła powinnny być takie same", "danger");
    } else {
      editUserPassword(match.params.id, formData, history);
    }
  };
  return (
    <Fragment>
      <div className="container container--flex ">
        <div className="form-body form-login">
          <div className="text-center">
            <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
              <div className="form-items-wrapper">
                <h1 className="form-heading">Zmień hasło</h1>
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
              <div className="form-items-wrapper">
                <input
                  type="submit"
                  className="btn btn--green"
                  value="Zmień hasło"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ResetUserPassword.propTypes = {
  editUserPassword: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users,
});

export default connect(mapStateToProps, {
  editUserPassword,
  getUser,
  setAlert,
})(ResetUserPassword);
