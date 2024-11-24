import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { MainScreen, MainPath } from '../components/screens/MainScreen';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={MainPath} render={() => <MainScreen />} />
      <Route render={() => <Redirect push to={MainPath} />} />
    </Switch>
  );
}
