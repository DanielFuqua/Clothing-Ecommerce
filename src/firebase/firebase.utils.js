import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDM-8qoaDpP7RdOEBJ-BgJZnl4Q2qNe-vE",
  authDomain: "clothing-ecommerce-db-411c7.firebaseapp.com",
  projectId: "clothing-ecommerce-db-411c7",
  storageBucket: "clothing-ecommerce-db-411c7.appspot.com",
  messagingSenderId: "436483630843",
  appId: "1:436483630843:web:487d3bcf35aefc78f7b25e",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
