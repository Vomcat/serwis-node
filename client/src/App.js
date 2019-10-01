import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";
import Repairs from "./components/repairs/Repairs";
import Repair from "./components/repairs/Repair";
import NewRepair from "./components/repairs/NewRepair";
import EditRepair from "./components/repairs/EditRepair";
import PrivateRoutes from "./components/routes/PrivateRoutes";

import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Alert from "./components/layout/Alert";

import store from "./store";
import { loadUser } from "./actions/auth";
import AuthToken from "./util/AuthToken";

if (localStorage.token) {
  AuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
            <PrivateRoutes exact path='/new' component={NewUser} />
            <PrivateRoutes exact path='/repairs' component={Repairs} />
            <PrivateRoutes exact path='/repair/:id' component={Repair} />
            <PrivateRoutes exact path='/newRepair' component={NewRepair} />
            <PrivateRoutes
              exact
              path='/editRepair/:id'
              component={EditRepair}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
