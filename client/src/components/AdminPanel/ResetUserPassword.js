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
      <div className="container container--flex ">
        <div className="form-body form-login">
          <div className="text-center">
            <form className="form-signin" onSubmit={(e) => onSubmit(e)}>
              <div className="form-items-wrapper">
                <h1 className="form-heading">Zmień hasło</h1>
              </div>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  placeholder="Powtórz hasło"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-items-wrapper">
                <input
                  type="submit"
                  className="btn btn--green"
                  value="Zmień hasło"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserPassword;
