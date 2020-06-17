import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/repairs" />;
  }
  return (
    <div className="background__image">
      <div className="landing">
        <div className="container">
          <section className="landing__info">
            <h1 className="form-heading">Serwis komputerowy</h1>
            <p className="lead">Zaloguj się na swoje konto</p>

            <Link to="/login" className="btn btn--green ">
              Zaloguj się
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
