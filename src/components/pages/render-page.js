import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../app";
import { Authen } from "../firebase";

const RenderPage = () => {
  let currentUser;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        currentUser = user;
      } else {
        currentUser = false;
        console.log(user);
      }
    });
  }, []);

  const appPage = () => <App />;
  const logPage = () => <Authen />;

  return (
    <Router>
      {currentUser ? (
        <Route path="/" component={appPage} />
      ) : (
        <Route path="/" component={logPage} />
      )}
    </Router>
  );
};

export default RenderPage;
