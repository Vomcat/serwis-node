import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";

const Stats = () => {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("/api/repairs/");
      setRepairs(res.data);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState([]);
  const onChange = (e) => setSearch(e.target.value);
  const result =
    repairs.find(({ _id }) => _id === search) ||
    repairs.find(({ last_name }) => last_name === search);
  const table = repairs.map((repair) => (
    <tr key={repair._id}>
      <td>{repair._id}</td>
      <td>{repair.first_name}</td>
      <td>{repair.last_name}</td>
      <td>{repair.phone_number}</td>
      <td>{repair.email}</td>
      <td>{repair.device}</td>
      <td>{repair.cost}</td>
      <td>{moment(repair.date).format("MM")}</td>
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
  ));

  return (
    <Fragment>
      <div className="container">
        <h2>Naprawy</h2>
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
              <th className="hide-sm">darta </th>
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

export default Stats;
