import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [repairsNumer] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("/api/repairs/");
      setRepairs(res.data);
    };
    fetchData();
  }, []);

  const lastRepair = currentPage * repairsNumer;
  const firstRepair = lastRepair - repairsNumer;
  const currentRepair = repairs.slice(firstRepair, lastRepair);

  const [search, setSearch] = useState([]);
  const onChange = (e) => setSearch(e.target.value);
  const result =
    repairs.find(({ _id }) => _id === search) ||
    repairs.find(({ last_name }) => last_name === search);

  const onDelete = async (e, id) => {};
  const table = result ? (
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
        <Link to={`/editRepair/${result._id}`} className="btn btn-warning">
          Edytuj
        </Link>
      </td>
      <td>
        <button>Usuń</button>
      </td>
    </tr>
  ) : (
    currentRepair.map((repair) => (
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
          <Link to={`/editRepair/${repair._id}`} className="btn btn-warning">
            Edytuj
          </Link>
        </td>
        <td>
          <button className="btn btn-danger">Usuń</button>
        </td>
      </tr>
    ))
  );

  return (
    <Fragment>
      <div className="container">
        <h2 className="reapirs--heading">Naprawy</h2>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => onChange(e)}
          />
        </form>
        <table className="table  table-hover ">
          <thead>
            <tr>
              <th className="hide-sm">Numer naprawy</th>
              <th>Imie</th>
              <th className="hide-sm">Nazwisko</th>
              <th className="hide-sm">Nr.telefonu</th>
              <th className="hide-sm">Email</th>
              <th className="hide-sm">Urządzenie </th>

              <th className="hide-sm">Koszt </th>
              <th className="hide-sm">Status </th>
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

export default Repairs;
