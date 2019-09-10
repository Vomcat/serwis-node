import React from "react";

const Login = () => {
  return (
    <div className="text-center">
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Zaloguj się</h1>
        <label for="inputEmail" className="sr-only">
          Nazwa użytkownika
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder=" Nazwa użytkownika"
          required
          autofocus
        />
        <label for="inputPassword" className="sr-only">
          Hasło
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Hasło"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Zapamiętaj
          </label>
        </div>
        <button
          className="btn btn-lg btn-btn btn-lg btn-secondary btn-block"
          type="submit"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
