import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";
import { deleteRepair } from "../../actions/repairs";

const Repairs = ({ getAllRepairs, repair: { repairs, loading } }) => {
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
