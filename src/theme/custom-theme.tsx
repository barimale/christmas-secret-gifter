import { createMuiTheme, hexToRgb } from '@material-ui/core/styles';
import { RGBToRGBA } from '../utilities/customTheme';

export const FontFamily = [
  'Nanum-Gothic', 'sans-serif',
].join(',');

const primaryMain = '#9c31bd';
const secondaryMain = '#bdad31';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
  },
  typography: {
    fontFamily: FontFamily,
  },
  overrides: {
    MuiTableContainer: {
      root: {
        overflowX: 'unset',
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: '0px',
        boxShadow: 'unset',
        border: `2px solid ${hexToRgb('#000000')}`,
        backgroundColor: `${RGBToRGBA(hexToRgb('#000000'), 1)}`,
        scrollBehavior: 'smooth',
      },
    },
    MuiCheckbox: {
      checked: {
        color: '#1f8c31 !important',
      },
    },
  },
});
