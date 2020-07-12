import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/users";
import { deleteUser } from "../../actions/users";

const Users = ({
  user: { users },
  auth: { user },
  getAllUsers,
  deleteUser,
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  const admin = { ...user };

  const table = users.map((user) => (
    <tr key={user._id}>
      <td data-label="Imię">{user.first_name}</td>
      <td data-label="Naziwsko">{user.last_name}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Status">{user.status ? "Admin " : " Pracownik"}</td>

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
        {admin._id === user._id ? (
          <div></div>
        ) : (
          <button
            onClick={() => deleteUser(user._id)}
            className="btn btn--red btn--small"
          >
            Usuń
          </button>
        )}
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
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(Users);
