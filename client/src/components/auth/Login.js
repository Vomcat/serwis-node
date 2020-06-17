import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/repairs" />;
  }
  return (
    <Fragment>
      <div className="background__image">
        <div className="landing">
          <div className="container container--flex ">
            <div className="form-body form-login">
              <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
                <div className="form-items-wrapper">
                  <h1 className="form-heading">Zaloguj się</h1>
                </div>
                <div className="form-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder=" Nazwa użytkownika"
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
                <div className="form-items-wrapper">
                  <input
                    type="submit"
                    className="btn btn--green"
                    value="Zaloguj się"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
