import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { appBaseRouteKey } from './routerConfiguration';
import { ContactScreen, Path as ContactPath } from '../components/screens/ContactScreen';
import MainScreen, { Path as HomePath } from '../components/screens/MainScreen';

export default function Routes () {
  return (
    <Switch>
      <Route path={appBaseRouteKey + HomePath} exact render={() => <MainScreen />} />
      <Route exact path={appBaseRouteKey + ContactPath} render={() => <ContactScreen />} />
      <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
    </Switch>
  );
}
