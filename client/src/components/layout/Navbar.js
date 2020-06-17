import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const admin = { ...user };
  const [dropMenu, setDropMenu] = useState(false);

  const authLink = (
    <ul>
      <li>
        <Link to="/repairs">Naprawy</Link>
      </li>
      <li>
        <Link to="/newRepair">Nowa naprawa</Link>
      </li>
      <li className="nav-item " onClick={() => setDropMenu(!dropMenu)}>
        <div>{admin.last_name}</div>
        {dropMenu && (
          <ul className="dropdown">
            {admin.status ? (
              <Fragment>
                {" "}
                <li>
                  <Link className="dropdown-item" to="/users">
                    Użytkownicy
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/new">
                    Dodaj użytkownika
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/stats">
                    Statystyki
                  </Link>
                </li>
              </Fragment>
            ) : null}

            <li>
              <a className="dropdown-item" onClick={logout} href="#!">
                Wyloguj
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Zaloguj</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <div className="navbar-con">
        <div className="navbar-mobile-logo">
          <h2>
            <Link to="/">
              <i className="navbar-brand" /> Serwis
            </Link>
          </h2>
        </div>
        <div className="navbar-mobile">
          <Fragment>
            {" "}
            {isAuthenticated ? authLink : guestLinks} {}
          </Fragment>
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { logout })(Navbar);
