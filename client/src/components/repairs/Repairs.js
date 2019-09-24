import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";

const Repairs = props => {
  return <div>Main</div>;
};

Repairs.propTypes = {
  getAllRepairs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  repairs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  repairs: state.repairs
});

export default connect(
  mapStateToProps,
  { getAllRepairs }
)(Repairs);
