import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";

const Repairs = ({ history, repair: { repairs }, getAllRepairs }) => {
  useEffect(() => {
    getAllRepairs();
  }, []);

  console.log("repairs to display", repairs);

  const table =
    repairs &&
    repairs.map(repair => (
      <tr key={repair._id}>
        <td>{repair._id}</td>
        <td>{repair.first_name}</td>
        <td>{repair.last_name}</td>
        <td>{repair.phone_number}</td>
        <td>{repair.email}</td>
        <td>{repair.device}</td>
        <td>{repair.imei}</td>
        <td>{repair.code}</td>
        <td>{repair.description}</td>
        <td>{repair.cost}</td>
        <td>{repair.status}</td>
        <td>
          <Link to="/editRepair">Edytuj</Link>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2>Naprawy</h2>
      <table>
        <thead>
          <tr>
            <th className="hide-sm">Numer naprawy</th>
            <th>Imie</th>
            <th className="hide-sm">Nazwisko</th>
            <th className="hide-sm">Nr.telefonu</th>
            <th className="hide-sm">Email</th>
            <th className="hide-sm">Nazwa urządzenie</th>
            <th className="hide-sm">Numer seryjny/Imei</th>
            <th className="hide-sm">Kod blokady</th>
            <th className="hide-sm">Opis usterki</th>
            <th className="hide-sm">Koszt naprawy</th>
            <th className="hide-sm">Status naprawy</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </Fragment>
  );
};

Repairs.propTypes = {
  getAllRepairs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  repair: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  repair: state.repairs
});

export default connect(
  mapStateToProps,
  { getAllRepairs }
)(Repairs);
