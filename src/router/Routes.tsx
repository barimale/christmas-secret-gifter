import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { MainScreen, Path as MainPath } from '../components/screens/MainScreen';
import { ContactScreen, Path as ContactPath } from '../components/screens/ContactScreen';

export default function Routes () {
  return (
    <Switch>
      <Route exact path={MainPath} render={() => <MainScreen />} />
      <Route exact path={ContactPath} render={() => <ContactScreen />} />
      <Route render={() => <Redirect push to={MainPath} />} />
    </Switch>
  );
}
