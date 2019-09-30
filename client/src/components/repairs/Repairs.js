import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";
import { deleteRepair } from "../../actions/repairs";

const Repairs = ({
  history,
  repair: { repairs },
  getAllRepairs,
  deleteRepair
}) => {
  useEffect(() => {
    getAllRepairs();
  }, []);

  console.log("repairs to display", repairs);
  console.log("delete", deleteRepair);

  const table =
    //repairs &&
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
        {console.log("naprawa", repair)}
        <td>
          <Link to='/editRepair'>Edytuj</Link>
        </td>
        <td>
          <button
            onClick={() => deleteRepair(repair._id)}
            className='btn btn-danger'>
            Usuń
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2>Naprawy</h2>
      {console.log(repairs)}

      <table className='table table-striped '>
        <thead>
          <tr>
            <th className='hide-sm'>Numer naprawy</th>
            <th>Imie</th>
            <th className='hide-sm'>Nazwisko</th>
            <th className='hide-sm'>Nr.telefonu</th>
            <th className='hide-sm'>Email</th>
            <th className='hide-sm'>Nazwa urządzenie</th>
            <th className='hide-sm'>Numer seryjny/Imei</th>
            <th className='hide-sm'>Kod blokady</th>
            <th className='hide-sm'>Opis usterki</th>
            <th className='hide-sm'>Koszt naprawy</th>
            <th className='hide-sm'>Status naprawy</th>
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
  deleteRepair: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  repair: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  repair: state.repairs
});

export default connect(
  mapStateToProps,
  { getAllRepairs, deleteRepair }
)(Repairs);

/*const Repairs = ({ getAllRepairs, repair: { repairs }, deleteRepair }) => {
  useEffect(() => {
    getAllRepairs();
  }, [getAllRepairs]);

  const table = repairs.map(all => (
    <tr key={all._id}>
      <td>{all._id}</td>
      <td>{all.first_name}</td>
      <td>{all.last_name}</td>
      <td>{all.phone_number}</td>
      <td>{all.email}</td>
      <td>{all.device}</td>
      <td>{all.imei}</td>
      <td>{all.code}</td>
      <td>{all.description}</td>
      <td>{all.cost}</td>
      <td>{all.status}</td>
      <td>
        <Link to='/editRepair'>Edytuj</Link>
      </td>
      <td>
        <button
          onClick={() => deleteRepair(all._id)}
          className='btn btn-danger'>
          Usuń
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className='container'>
        <h2>Naprawy</h2>
        <table className='table table-striped '>
          <thead>
            <tr>
              <th className='hide-sm'>Numer naprawy</th>
              <th>Imie</th>
              <th className='hide-sm'>Nazwisko</th>
              <th className='hide-sm'>Nr.telefonu</th>
              <th className='hide-sm'>Email</th>
              <th className='hide-sm'>Nazwa urządzenie</th>
              <th className='hide-sm'>Numer seryjny/Imei</th>
              <th className='hide-sm'>Kod blokady</th>
              <th className='hide-sm'>Opis usterki</th>
              <th className='hide-sm'>Koszt naprawy</th>
              <th className='hide-sm'>Status</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      </div>
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
  repair: state.repair,
  delete: state.delete
});

export default connect(
  mapStateToProps,
  { getAllRepairs, deleteRepair }
)(Repairs);
*/
