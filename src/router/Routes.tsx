import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { MainScreen } from '../components/screens/MainScreen';
import { ContactScreen } from '../components/screens/ContactScreen';

const Routes = () => (
  <Switch>
    <Route path="/" component={MainScreen} />
    <Route exact path="/contact" component={ContactScreen} />
    <Route render={() => (<Redirect to="/" />)} />
  </Switch>
);

export default Routes;
