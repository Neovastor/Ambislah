// ==================================Hadi & Fadhil ==================================
import React from 'react';
import './App.css';
import './styles/output.css'
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

function App() {
  return (
    <>
      <NavBar></NavBar>
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
        <Route> <Home /> </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}


//================================== PUNYA BRIAN ==================================
// import Button from "./components/Button";
// import Channel from "./pages/Host";
// import WaitingRoom from "./pages/WaitingRoomHost";
// import Join from "./pages/Join";
// import PlayerRoom from "./pages/PlayerRoom";

// import { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import { Switch, Route } from "react-router-dom";

// firebase.initializeApp({
//   apiKey: "AIzaSyC33_F7QhSbb0pvHpWawdF9UaNgyxumQdw",
//   authDomain: "ambislah.firebaseapp.com",
//   projectId: "ambislah",
//   storageBucket: "ambislah.appspot.com",
//   messagingSenderId: "242292821855",
//   appId: "1:242292821855:web:ba7596c53f30af394cf0ea",
// });

// const db = firebase.firestore();

// function App() {
//   useEffect(() => {}, []);

//   return (
//     <div className="container m-5">
//       <Switch>
//         <Route exact path="/">
//           <p>"Welcome host, you can create a room"</p>
//           <Channel db={db}></Channel>
//         </Route>

//         <Route exact path="/waitingroom/:idroom">
//           <WaitingRoom db={db}></WaitingRoom>
//         </Route>

//         <Route exact path="/join">
//           <Join db={db}></Join>
//         </Route>

//         <Route exact path="/player">
//           <PlayerRoom db={db}></PlayerRoom>
//         </Route>
//       </Switch>
//     </div>
//   );
// }




export default App;
