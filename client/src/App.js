import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './pages/NavBar';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
