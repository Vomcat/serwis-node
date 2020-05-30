import React, { useState, Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { editUser, getUser } from "../../actions/users";
import PropTypes from "prop-types";

const EditUser = ({
  user: { user, loading },
  setAlert,
  editUser,
  getUser,
  history,
  match,
}) => {
  const [formData, SetFormData] = useState({
    userid: match.params.id,
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    status: "",
  });
  const { userid, name, first_name, last_name, email, status } = formData;

  useEffect(() => {
    getUser(userid);
  }, [userid, getUser]);

  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  const isMounted = useIsMounted();

  useEffect(() => {
    if (loading === false && isMounted.current) {
      const { userid, name, first_name, last_name, email, status } = user;
      SetFormData({
        userid,
        name,
        first_name,
        last_name,
        email,
        status,
      });
    }
  }, [user, isMounted, loading]);

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="container container--flex ">
        <div className="form-body form-login">
          <div className="text-center">
            <form
              className="form-signin"
              onSubmit={(e) => {
                e.preventDefault();
                editUser(match.params.id, formData, history);
              }}
            >
              <div className="form-items-wrapper">
                <h1 className="form-heading">Edytuj dane pracownika</h1>
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=" Nazwa użytkownika"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="Imię"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Nazwisko"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" Email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <select
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                  className="select-css"
                >
                  <option value="0">Rodzaj użytkownika</option>
                  <option value="false">Admin</option>
                  <option value="true"> User</option>
                </select>
              </div>
              <div className="form-items-wrapper">
                <input type="submit" className="btn btn--green" value="Dodaj" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditUser.propTypes = {
  editUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users,
});

export default connect(mapStateToProps, { editUser, getUser })(EditUser);
