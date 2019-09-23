import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //przekeierowanie

  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }
  return (
    <Fragment>
      <div className="text-center">
        <form className="form-signin" onSubmit={e => onSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Zaloguj się</h1>

          <input
            type="email"
            name="email"
            className="form-control"
            placeholder=" Nazwa użytkownika"
            value={email}
            onChange={e => onChange(e)}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Hasło"
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="submit"
            className='"btn btn-lg btn-btn btn-lg btn-secondary btn-block'
            value="Login"
          />
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
