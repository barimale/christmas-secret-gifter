import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { constants } from 'zlib';

export const theme = createTheme({
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

export const CustomMuiThemeProvider = function(props: any) {
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  );
}


export const cacheImages = async (srcArray: Array<string>) => {
  const promises = await srcArray.map((src: string) => new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => reject();
  }));

  await Promise.all(promises);
};

export function RGBToRGBA(rgb: any, alpha: any) {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(sep);

  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}
