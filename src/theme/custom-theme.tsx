import { createTheme } from '@material-ui/core/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#1f8c31',
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
  },
});
