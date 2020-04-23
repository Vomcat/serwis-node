import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const EditUserPassword = ({ match, history }) => {
  const [formData, setData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;

  const onChange = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const upUser = {
      password,
    };
    if (password !== password2) {
      console.log("dupa");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = upUser;
        const res = await axios.put(
          "/api/users/reset/" + match.params.id,
          body,
          config
        );
        history.push("/users");
      } catch (err) {
        console.log(err);
      }
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
          />

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

export default EditUserPassword;
