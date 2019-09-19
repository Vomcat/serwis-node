import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";
import Main from "./components/main/Main";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import AuthToken from "./util/AuthToken";

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
            <PrivateRoutes exact path='/main' component={Main} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
