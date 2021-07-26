// ==================================Hadi & Fadhil ==================================
import React from 'react';
import './App.css';
import './styles/output.css'
import { useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Create from './pages/Create';
import Report from './pages/Report';
import Login from './pages/Login'
import Register from './pages/Register'
import Teacher from './pages/Teacher'
import WebRTCCreateRoom from './pages/WebRTCCreateRoom'
import WebRTCRoom from './pages/WebRTCRoom'
import Collections from './pages/Collections'
import WaitingRoom from './pages/WaitingRoom'
import Host from "./pages/Host";
import WaitingRoom from "./pages/HostRoom";
import Join from "./pages/Join";
import PlayerRoom from "./pages/PlayerRoom";
import AnswerLive from "./pages/AnswerLive";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Speech from './pages/SpeechTest'

firebase.initializeApp({
  apiKey: "AIzaSyC33_F7QhSbb0pvHpWawdF9UaNgyxumQdw",
  authDomain: "ambislah.firebaseapp.com",
  projectId: "ambislah",
  storageBucket: "ambislah.appspot.com",
  messagingSenderId: "242292821855",
  appId: "1:242292821855:web:ba7596c53f30af394cf0ea",
});

const db = firebase.firestore();


// import {SpeechRecognition} from './components'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/waitingroom"> <WaitingRoom /> </Route>
        <Route exact path="/collections"> <Collections /> </Route>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/register"> <Register /> </Route>
        <Route exact path="/report"> <Report /> </Route>
        <Route exact path="/create"> <Create /> </Route>
        <Route exact path="/teacher"> <Teacher /> </Route>
        <Route exact path="/room"> <WebRTCCreateRoom /> </Route>
        <Route exact path="/room/:roomID"> <WebRTCRoom /> </Route>
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
        <Route exact path="/"> <Home /> </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;
