import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";
import Alert from "./components/layout/Alert";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/new" component={NewUser} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
