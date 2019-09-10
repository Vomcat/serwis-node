import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h3>
        <Link to="">
          <i className="" /> Serwis
        </Link>
      </h3>
      <ul>
        <li>
          <Link to="/login"></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
