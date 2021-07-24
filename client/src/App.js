import Button from "./components/Button";
import Channel from "./components/Room";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC33_F7QhSbb0pvHpWawdF9UaNgyxumQdw",
  authDomain: "ambislah.firebaseapp.com",
  projectId: "ambislah",
  storageBucket: "ambislah.appspot.com",
  messagingSenderId: "242292821855",
  appId: "1:242292821855:web:ba7596c53f30af394cf0ea",
});


const db = firebase.firestore();

function App() {
  
  useEffect(() => {}, []);

  return (
    <div className="container m-5">
      <div>
        <p>"Welcome host, you can create a room"</p>
        <Channel  db={db}></Channel>
      </div>
    </div>
  );
}

export default App;
