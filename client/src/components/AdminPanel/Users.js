import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/users";
import { deleteUser } from "../../actions/users";

const Users = ({ user: { users }, getAllUsers, deleteUser }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const table = users.map((user) => (
    <tr key={user._id}>
      <td scope="row" data-label="Imię">
        {user.name}
      </td>
      <td data-label="Imię">{user.first_name}</td>
      <td data-label="Imię">{user.last_name}</td>
      <td data-label="Imię">{user.email}</td>
      <td data-label="Imię">{user.status ? "Admin" : "Pracownik"}</td>

      <td>
        <Link
          to={`/editUser/${user._id}`}
          className="btn btn--yellow btn--small"
        >
          Edytuj
        </Link>
      </td>
      <td>
        <Link
          to={`/resteUserPassword/${user._id}`}
          className="btn btn--yellow btn--small"
        >
          Reset Hasła
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteUser(user._id)}
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
        <div className="form-body ">
          <h2>Użytkownicy</h2>

          <table>
            <thead>
              <tr className="tabel-heading">
                <th scope="col">Login</th>
                <th scope="col">Imie</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Email</th>
                <th scope="col">Status </th>
                <th />
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.users,
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(Users);
