import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../app";
import { Authen } from "../firebase";

const RenderPage = () => {
  let currentUser;

  useEffect(() => {
    // const getUser = async () => {
    //   currentUser = await firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //       console.log(user);
    //       console.log("commit");
    //       currentUser = user;
    //     } else {
    //       currentUser = false;
    //       console.log(user);
    //     }
    //   });
    // };

    (async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          currentUser = user;
          console.log(currentUser);
        } else {
          currentUser = false;
          console.log(currentUser);
        }
      });
    })();
  }, []);

  const appPage = () => <App />;
  const logPage = () => <Authen />;

  return (
    <React.Fragment>
      {(async () => {
        await currentUser;
        console.log(currentUser);
        return currentUser;
      })() ? (
        <p>true</p>
      ) : (
        <p>false </p>
      )}
    </React.Fragment>

    // <h1>{currentUser}</h1>

    // <Router>
    //   {currentUser ? (
    //     <Route path="/" component={appPage} />
    //   ) : (
    //     <Route path="/" component={logPage} />
    //   )}
    // </Router>
  );
};

export default RenderPage;
