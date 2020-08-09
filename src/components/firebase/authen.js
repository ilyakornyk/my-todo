// Your web app's Firebase configuration
import React from "react";
import firebase from "firebase";
import "./authen.css";

const Authen = () => {
  const googleLogin = () => {
    console.log("google");

    let provider = new firebase.auth.GoogleAuthProvider();

    let promise = firebase.auth().signInWithPopup(provider);

    promise.then((result) => {
      let user = result.user;

      firebase
        .database()
        .ref("users/" + user.uid)
        .update({
          email: user.email,
          name: user.displayName,
        });
    });

    promise.catch((e) => {
      let msg = e.message;
      console.log(msg);
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("you are sign out");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <React.Fragment>
      <button
        onClick={googleLogin}
        id="google"
        className="btn google"
        title="Sign in with Google"
      >
        <i class="fab fa-google"></i>
      </button>

      {/* <button onClick={signOut} id="google" className="btn google">
        <i class="fas fa-sign-out-alt"></i>
      </button> */}

      <button
        onClick={signOut}
        id="signOut"
        className="btn google"
        title="Sign out"
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </React.Fragment>
  );
};

export default Authen;
