import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/Login/Index';
import Home from './pages/Home/Index';
import Recipe from './pages/Recipe/Index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/recipe/:id" exact component={Recipe} />
      </Switch>
    </Router>
  );
}

export default App;
