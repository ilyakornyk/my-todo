// Your web app's Firebase configuration
import firebase from "firebase";
import { firebaseConfig } from './firebase'

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const fire_data_base = firebase.database();

export const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(provider);
};



