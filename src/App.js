import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import ReposPage from './views/ReposPage/ReposPage.js';

const hist = createBrowserHistory();

export default function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/" render={props => <ReposPage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
