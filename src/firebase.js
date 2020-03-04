import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDwQGBpcUDMd7veFa1il1SiQG1Pq6gxLl0",
  authDomain: "slack-chat-app-de945.firebaseapp.com",
  databaseURL: "https://slack-chat-app-de945.firebaseio.com",
  projectId: "slack-chat-app-de945",
  storageBucket: "slack-chat-app-de945.appspot.com",
  messagingSenderId: "298657675935",
  appId: "1:298657675935:web:de89200ff0880e292800aa",
  measurementId: "G-HXKJWEWCH8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
