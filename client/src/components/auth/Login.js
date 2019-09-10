import React, { Fragment, useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <div className='text-center'>
        <form className='form-signin' onSubmit={e => onSubmit(e)}>
          <h1 className='h3 mb-3 font-weight-normal'>Zaloguj się</h1>

          <input
            type='email'
            name='email'
            className='form-control'
            placeholder=' Nazwa użytkownika'
            value={email}
            onChange={e => onChange(e)}
            required
            autoFocus
          />

          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Hasło'
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' value='remember-me' /> Zapamiętaj
            </label>
          </div>
          <button
            className='btn btn-lg btn-btn btn-lg btn-secondary btn-block'
            type='submit'
            value='login'>
            Zaloguj
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
