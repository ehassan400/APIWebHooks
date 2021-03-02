import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Home from './home';

const history = createBrowserHistory();

ReactDOM.render((
  <Router history={history}>
    <Home history={history} />
  </Router>
), document.getElementById('root'))