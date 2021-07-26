// ==================================Hadi & Fadhil ==================================
import "./App.css";
import "./styles/output.css";
import { Switch, Route, Prompt } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Footer from "./pages/Footer";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Host from "./pages/Host";
import WaitingRoom from "./pages/HostRoom";
import Join from "./pages/Join";
import PlayerRoom from "./pages/PlayerRoom";
import AnswerLive from "./pages/AnswerLive";
import Create from "./pages/Create";
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
  
  

  return (
    <>
      {/* <NavBar></NavBar> */}
      <Switch>
        

        <div className="container m-5">
          <Route exact path="/login">
            {" "}
            <Login />{" "}
          </Route>
          <Route exact path="/register">
            {" "}
            <Register />{" "}
          </Route>
          <Route exact path="/report">
            {" "}
            <Report />{" "}
          </Route>
          <Route exact path="/create">
            {" "}
            <Create />{" "}
          </Route>

          <Route exact path="/host">
            <p>"Welcome host, you can create a room"</p>
            <Host db={db}></Host>
          </Route>

          <Route exact path="/waitingroom/:idroom">
            <WaitingRoom db={db}></WaitingRoom>
          </Route>

          <Route exact path="/join">
            <Join db={db}></Join>
          </Route>

          <Route exact path="/player">
            <PlayerRoom db={db}></PlayerRoom>
          </Route>
          {/* <Route> <Home /> </Route> */}
        </div>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;
