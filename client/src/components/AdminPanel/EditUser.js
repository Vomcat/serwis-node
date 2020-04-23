import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { add } from "../../actions/users";
import PropTypes from "prop-types";
import axios from "axios";
const EditUser = ({ match, history }) => {
  const [formData, setData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/users/" + match.params.id);
      setData({
        name: !res.data.name ? "" : res.data.name,
        first_name: !res.data.first_name ? "" : res.data.first_name,
        last_name: !res.data.last_name ? "" : res.data.last_name,
        email: !res.data.email ? "" : res.data.email,
        status: !res.data.status ? "" : res.data.status,
      });
    };
    fetchData();
  }, []);

  const { name, first_name, last_name, email, status } = formData;

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const upUser = {
      name,
      first_name,
      last_name,
      email,
      status,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = upUser;
      const res = await axios.put(
        "/api/users/editUser/" + match.params.id,
        body,
        config
      );

      history.push("/users");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <div className="text-center">
        <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">
            Edytuj dane użytkownika
          </h1>

          <input
            type="text"
            name="name"
            className="form-control"
            placeholder=" Nazwa użytkownika"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            name="first_name"
            className="form-control"
            placeholder="Imię"
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            name="last_name"
            className="form-control"
            placeholder="Nazwisko"
            value={last_name}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder=" Email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />

          {/*      <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Hasło"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            name="password2"
            className="form-control"
            placeholder="Powtórz hasło"
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />  */}
          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">Rodzaj użytkownika</option>
              <option value="false">Admin</option>
              <option value="true"> User</option>
            </select>
          </div>

          <input
            type="submit"
            className='"btn btn-lg btn-btn btn-lg btn-secondary btn-block'
            value="Dodaj"
          />
        </form>
      </div>
    </Fragment>
  );
};

EditUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { setAlert, add })(EditUser);
