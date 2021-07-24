import './App.css';
import './styles/output.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import Create from './pages/Create';
import Report from './pages/Report';
import Login from './pages/Login'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/report"> <Report /> </Route>
        <Route exact path="/create"> <Create /> </Route>
        <Route> <Home /> </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;
