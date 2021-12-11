import { createTheme } from '@material-ui/core/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#0B3976',
    },
    secondary: {
      main: 'rgba(206, 17, 38, 1)',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat', 'sans-serif',
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
