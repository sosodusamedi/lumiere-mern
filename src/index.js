import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import Routes from './Routes';


ReactDOM.render((
  <BrowserRouter history={browserHistory}>
    <Routes />
  </BrowserRouter>
), document.getElementById('root')
);
