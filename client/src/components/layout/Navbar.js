import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, logout } }) => {
  const authLink = (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/new">
          Dodaj
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/main">
          Nowa naprawa
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={logout} href="#!">
          Wyloguj
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-md navbar-dark  bg-dark navbar bg-dark">
      <h2>
        <Link className="nav-link" to="/">
          <i className="" /> Serwis
        </Link>
      </h2>
      {!loading && (
        <Fragment> {isAuthenticated ? authLink : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ auth: state.auth });
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
