import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRepair } from "../../actions/repairs";

const Repair = ({ getRepair, repair: { repair, loading }, match }) => {
  useEffect(() => {
    getRepair(match.params.id);
  }, [getRepair]);
  return <div>post</div>;
};

Repair.propTypes = {
  getRepair: PropTypes.func.isRequired,
  repair: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  repair: state.repair
});
export default connect(
  mapStateToProps,
  { getRepair }
)(Repair);
