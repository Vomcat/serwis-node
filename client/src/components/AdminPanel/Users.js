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

  console.log("uzytkownicy", users);

  const table = users.map(user => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>

      <td>
        <Link to={`/editUser/${user._id}`} className='btn btn-warning'>
          Edytuj
        </Link>
      </td>
      <td>
        <button onClick={() => deleteUser(user._id)} className='btn btn-danger'>
          Usuń
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className='container'>
        <h2>Użytkownicy</h2>
        {console.log(users)}

        <table className='table  table-hover '>
          <thead>
            <tr>
              <th className='hide-sm'>Login</th>
              <th className='hide-sm'>Imie</th>
              <th className='hide-sm'>Nazwisko</th>
              <th className='hide-sm'>Email</th>
              <th className='hide-sm'>Status </th>
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

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.users
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUser }
)(Users);
