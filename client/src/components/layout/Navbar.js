import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const admin = { ...user };
  const authLink = (
    <ul className="nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/repairs">
          Naprawy
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/newRepair">
          Nowa naprawa
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Konto użytkownika
        </a>
        <div className="dropdown-menu">
          {admin.status ? (
            <Fragment>
              {" "}
              <Link className="dropdown-item" to="/users">
                Użytkownicy
              </Link>
              <Link className="dropdown-item" to="/new">
                Dodaj użytkownika
              </Link>
              <Link className="dropdown-item" to="/stats">
                Statystyki
              </Link>
              <Link className="dropdown-item" to="/chart">
                Statystyki
              </Link>
            </Fragment>
          ) : null}
          <div class="dropdown-divider"></div>
          <Link className="dropdown-item" to="/users">
            Ustawienia
          </Link>
          <a className="dropdown-item" onClick={logout} href="#!" href="#">
            Wyloguj
          </a>
        </div>
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
    <nav className="navbar sticky-top bg-dark">
      <h2>
        <Link className="nav-link" to="/">
          <i className="navbar-brand" /> Serwis
        </Link>
      </h2>
      <Fragment>
        {" "}
        {isAuthenticated ? authLink : guestLinks} {}
      </Fragment>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { logout })(Navbar);
