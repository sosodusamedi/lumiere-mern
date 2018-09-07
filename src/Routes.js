import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App';
import AddUser from './components/AddUser';
import User from './components/User';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <Route path='/add-user' component={AddUser} />
    <Route path='/user/:id' component={User} />
  </Switch>
);

export default Routes;
