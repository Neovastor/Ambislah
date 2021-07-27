import React from 'react';
import './App.css';
import './styles/output.css'
import { Switch, Route } from 'react-router-dom'
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Login from './pages/Login'
import Register from './pages/Register'
import Teacher from './pages/Teacher'
import WebRTCCreateRoom from './pages/WebRTCCreateRoom'
import WebRTCRoom from './pages/WebRTCRoom'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Create from './pages/Create';
import Report from './pages/Report';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/register"> <Register /> </Route>
        <Route exact path="/report"> <Report /> </Route>
        <Route exact path="/create"> <Create /> </Route>
        <Route exact path="/teacher"> <Teacher /> </Route>
        <Route exact path="/room2"> <WebRTCCreateRoom /> </Route>
        <Route exact path="/room2/:roomID"> <WebRTCRoom /> </Route>
        <Route path="/room" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
        <Route> <Home /> </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;
