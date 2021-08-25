import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './style.css';
import HomePage from 'views/HomePage/HomePage.js';

const hist = createBrowserHistory();

export default function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/home" render={props => <HomePage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
