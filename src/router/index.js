import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { UserContext } from 'context/userProvider';

import ErrorPage from 'pages/error-page';
import HomePage from 'components/home/home';
import LogInPage from 'pages/log-in'

const Routing = () => {
  const user = useContext(UserContext);
  return (
    <Router >
      {user ? <Redirect to="/" /> : <Redirect to="/login" />}

      <Switch>
        <Route path="/about">
          <ErrorPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routing;
