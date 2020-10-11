import React, { useState, useEffect } from "react";
import { firebase } from "../components/firebase";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../components/app";
import { Authen } from "../components/firebase";
import { app } from "firebase";


const RenderPage = () => {
  const [isLogin, setLogin] = useState(false);

  let currentUser;

  // useEffect(() => {
  //   // (async () => {
  //   //   await firebase.auth().onAuthStateChanged(function (user) {
  //   //     if (user) {
  //   //       setLogin(() => true);
  //   //     } else {
  //   //       setLogin(() => false);
  //   //     }
  //   //   });
  //   // })();

  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       setLogin(() => true);
  //       <Redirect to='/dashboard' />
  //     } else {
  //       setLogin(() => false);
  //       <Redirect to='/login' />
  //     }
  //   }
  // }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLogin(() => true);
        return <Redirect to="/dashboard" />;
      } else {
        setLogin(() => false);
        return <Redirect to="/login" />;
      }
    });
  });

  const appPage = () => (
    <h1>Home</h1>
    <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    )
  const logPage = () => <Authen />;
  const signUp = () => {
    return (
      <React.Fragment>
        <h2>Sign Up</h2>
        <Authen />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Route>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Authen} />
          <Route exact path="/signup" component={v} />
        </div>
      </Route>
    </React.Fragment>
  );
};

export default RenderPage;
