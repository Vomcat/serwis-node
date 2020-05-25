import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRepairs } from "../../actions/repairs";
import { deleteRepair } from "../../actions/repairs";
const Repairs = ({ repair: { repairs }, getAllRepairs, deleteRepair }) => {
  useEffect(() => {
    getAllRepairs();
  }, [getAllRepairs]);

  const [currentPage, setCurrentPage] = useState(1);
  const [repairsNumer] = useState(5);
  const [search, setSearch] = useState([]);

  const lastRepair = currentPage * repairsNumer;
  const firstRepair = lastRepair - repairsNumer;
  const currentRepair = repairs.slice(firstRepair, lastRepair);

  const onChange = (e) => setSearch(e.target.value);
  const result = repairs.filter((x) => x.phone_number == search);
  console.log(result);
  const onDelete = async (e, id) => {};
  const table =
    result != ""
      ? result.map((repair) => (
          <tr>
            <td scope="row" data-label="Imię">
              {repair.first_name}
            </td>
            <td data-label="Nazwisko">{repair.last_name}</td>
            <td data-label="Numer tel.">{repair.phone_number}</td>
            <td data-label="Email">{repair.email}</td>
            <td data-label="Urządzenie">{repair.device}</td>
            <td data-label="koszt">{repair.cost}</td>
            <td data-label="Status">{repair.status}</td>
            <td>
              <Link
                to={`/editRepair/${repair._id}`}
                className="btn btn--yellow btn--small"
              >
                Edytuj
              </Link>
            </td>
            <td>
              <button className="btn btn--red btn--small">Usuń</button>
            </td>
          </tr>
        ))
      : repairs.map((repair) => (
          <tr key={repair._id}>
            <td scope="row" data-label="Imię">
              {repair.first_name}
            </td>
            <td data-label="Nazwisko">{repair.last_name}</td>
            <td data-label="Numer tel.">{repair.phone_number}</td>
            <td data-label="Email">{repair.email}</td>
            <td data-label="Urządzenie">{repair.device}</td>
            <td data-label="Koszt">{repair.cost}</td>
            <td data-label="Status">{repair.status}</td>

            <td>
              <Link
                to={`/editRepair/${repair._id}`}
                className="btn btn--yellow btn--small"
              >
                Edytuj
              </Link>
            </td>
            <td>
              <button
                onClick={() => deleteRepair(repair._id)}
                className="btn btn--red btn--small"
              >
                Usuń
              </button>
            </td>
          </tr>
        ));

  return (
    <Fragment>
      <div className="container">
        <div className="form-body table-body">
          <div class="form-items-wrapper">
            <h2>Naprawy</h2>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <div className="form-input-wrapper">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => onChange(e)}
              />
            </div>
          </form>
          <table>
            <thead>
              <tr className="tabel-heading">
                <th scope="col">Imie</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Nr.telefonu</th>
                <th scope="col">Email</th>
                <th scope="col">Urządzenie </th>

                <th scope="col">Koszt </th>
                <th scope="col">Status </th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Repairs.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllRepairs: PropTypes.func.isRequired,
  getRepair: PropTypes.func.isRequired,
  deleteRepair: PropTypes.func.isRequired,

  repair: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  repair: state.repairs,
});

export default connect(mapStateToProps, {
  getAllRepairs,
  deleteRepair,
})(Repairs);
