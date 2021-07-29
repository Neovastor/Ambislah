import React from 'react';
import './App.css';
import './styles/output.css'
import { Switch, Route, Prompt } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Login from './pages/Login'
import Register from './pages/Register'
import Report from './pages/Report';
import Home from './pages/Home';
import Collections from './pages/Collections'
// import WaitingRoom from './pages/WaitingRoom'
import UpdateQuiz from './pages/UpdateQuiz'
import UpdateQuestions from './pages/UpdateQuestions'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Create from './pages/Create';


import Host from "./pages/Host";
import WaitingRoom from "./pages/HostRoom";
import Join from "./pages/Join";
import PlayerRoom from "./pages/PlayerRoom";
import AnswerLive from "./pages/AnswerLive";
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
})

const db = firebase.firestore();

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>

        <Route exact path="/collections/updatequestion"> <UpdateQuestions /> </Route>
        <Route exact path="/collections/update"> <UpdateQuiz /> </Route>
        <Route exact path="/waitingroom"> <WaitingRoom /> </Route>
        <Route exact path="/collections"> <Collections db={db}/> </Route>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/register"> <Register /> </Route>
        <Route exact path="/report"> <Report /> </Route>
        <Route exact path="/create"> <Create /> </Route>
        <Route path="/room" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
          <Route exact path="/host">            
            <Host db={db}></Host>
          </Route>

          <Route exact path="/waitingroom/:idroom">
            <WaitingRoom db={db}></WaitingRoom>
          </Route>

          <Route exact path="/join">
            <Join db={db}></Join>
          </Route>

          <Route exact path="/player/:idroom">
            <PlayerRoom db={db}></PlayerRoom>
          </Route>
        <Route> <Home exact path="/" /> </Route>
          
      </Switch>
      <Footer></Footer>
    </>
  )

}
 


export default App;