import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme } from './custom-theme';

export const CustomMuiThemeProvider = function (props: any) {
  return (
    <MuiThemeProvider theme={Theme}>
      {props.children}
    </MuiThemeProvider>
  );
};
