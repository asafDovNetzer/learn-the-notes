import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBNeJGhiRWUd4nPsiqOgT4j3yXr-f35ZzU",
  authDomain: "learn-the-notes.firebaseapp.com",
  databaseURL: "https://learn-the-notes-default-rtdb.firebaseio.com",
  projectId: "learn-the-notes",
  storageBucket: "learn-the-notes.appspot.com",
  messagingSenderId: "988020024317",
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
