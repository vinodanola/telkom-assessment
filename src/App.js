import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import HomePage from './views/HomePage/HomePage.js';

const hist = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: 0
  }
}));

export default function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/" render={props => <HomePage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
