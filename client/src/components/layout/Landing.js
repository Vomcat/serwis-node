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
    <section className="text-center">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main role="main" className="inner cover">
            <h1 className="cover-heading">Serwis komputerowy</h1>
            <p className="lead">Zaloguj się na swoje konto</p>
            <p className="lead">
              <Link to="/login" className="btn btn-lg btn-secondary">
                Login
              </Link>
            </p>
          </main>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
