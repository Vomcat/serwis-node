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
      <li className="nav-item dropdown" onClick={() => setDropMenu(!dropMenu)}>
        <a aria-haspopup="true">{(admin.first_name, admin.last_name)}</a>
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
              <Link className="dropdown-item" to="/users">
                Ustawienia
              </Link>
            </li>
            <li>
              <a className="dropdown-item" onClick={logout} href="#!" href="#">
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
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <div className="navbar-con">
        <h2>
          <Link to="/">
            <i className="navbar-brand" /> Serwis
          </Link>
        </h2>
        <Fragment>
          {" "}
          {isAuthenticated ? authLink : guestLinks} {}
        </Fragment>
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
