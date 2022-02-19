import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9c31bd',
    },
    secondary: {
      main: '#bdad31',
    },
  },
  typography: {
    fontFamily: [
      'Nanum-Gothic', 'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiTableContainer: {
      root: {
        overflowX: 'unset',
      },
    },
    MuiCheckbox: {
      checked: {
        color: '#1f8c31 !important',
      },
    },
  },
});
