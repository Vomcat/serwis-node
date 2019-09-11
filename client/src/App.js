import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import AuthToken from "./util/AuthToken";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.token) {
  AuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/new' component={NewUser} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
