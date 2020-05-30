import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRepair } from "../../actions/repairs";

const RepairsTable = ({
  repair: {
    first_name,
    last_name,
    phone_number,
    email,
    device,
    code,
    imei,
    description,
    cost,
    status,
  },
  deleteRepair,
}) => {
  return (
    <div>
      <div>
        <h2>{imei}</h2>
      </div>
      <div>
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{phone_number}</p>
        <p>{email}</p>
        <p>{device}</p>
        <p>{code}</p>
        <p>{imei}</p>
        <p>{description}</p>
        <p>{cost}</p>
        <p>{status}</p>
      </div>
    </div>
  );
};

RepairsTable.propTypes = {
  deleteRepair: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repair: state.repair,
});

export default connect(mapStateToProps, {
  deleteRepair,
})(RepairsTable);
