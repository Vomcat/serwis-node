import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoutes = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);
AdminRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoutes);
