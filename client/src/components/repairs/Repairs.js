import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";
import { deleteRepair } from "../../actions/repairs";
import { getRepair } from "../../actions/repairs";
const Repairs = ({
  auth,
  repair: { repairs },
  getAllRepairs,
  deleteRepair,
  getRepair
}) => {
  useEffect(() => {
    getAllRepairs();
  }, [getAllRepairs]);

  const [search, setSearch] = React.useState("");
  const onChange = e => setSearch(e.target.value);
  // console.log("repairs to display", repairs);

  // const result = repairs.find(({ _id }) => _id === search);
  const result =
    repairs.find(({ _id }) => _id === search) ||
    repairs.find(({ last_name }) => last_name === search);

  const table =
    //repairs &&
    result ? (
      <tr>
        <td>{result._id}</td>

        <td>{result.first_name}</td>
        <td>{result.last_name}</td>
        <td>{result.phone_number}</td>
        <td>{result.email}</td>
        <td>{result.device}</td>
        <td>{result.cost}</td>
        <td>{result.status}</td>
        <td>
          <Link to={`/editRepair/${result._id}`} className='btn btn-warning'>
            <span onClick={() => getRepair(result._id)}>Edytuj</span>
          </Link>
        </td>
        <td>
          <button
            onClick={() => deleteRepair(result._id)}
            className='btn btn-danger'>
            Usuń
          </button>
        </td>
      </tr>
    ) : (
      repairs.map(repair => (
        <tr key={repair._id}>
          <td>{repair._id}</td>
          <td>{repair.first_name}</td>
          <td>{repair.last_name}</td>
          <td>{repair.phone_number}</td>
          <td>{repair.email}</td>
          <td>{repair.device}</td>
          <td>{repair.cost}</td>
          <td>{repair.status}</td>

          <td>
            <Link to={`/editRepair/${repair._id}`} className='btn btn-warning'>
              Edytuj
            </Link>
          </td>
          <td>
            <button
              onClick={() => deleteRepair(repair._id)}
              className='btn btn-danger'>
              Usuń
            </button>
          </td>
        </tr>
      ))
    );

  return (
    <Fragment>
      <div className='container'>
        <h2>Naprawy</h2>
        <form className='form-inline my-2 my-lg-0'>
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            value={search}
            onChange={e => onChange(e)}
          />
        </form>
        <table className='table  table-hover '>
          <thead>
            <tr>
              <th className='hide-sm'>Numer naprawy</th>
              <th>Imie</th>
              <th className='hide-sm'>Nazwisko</th>
              <th className='hide-sm'>Nr.telefonu</th>
              <th className='hide-sm'>Email</th>
              <th className='hide-sm'>Urządzenie </th>

              <th className='hide-sm'>Koszt </th>
              <th className='hide-sm'>Status </th>
              <th />
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
  auth: PropTypes.object.isRequired,
  getAllRepairs: PropTypes.func.isRequired,
  getRepair: PropTypes.func.isRequired,
  deleteRepair: PropTypes.func.isRequired,

  repair: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  repair: state.repairs
});

export default connect(
  mapStateToProps,
  { getAllRepairs, deleteRepair, getRepair }
)(Repairs);
