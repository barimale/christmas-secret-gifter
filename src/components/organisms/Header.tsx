/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import sizeMe from 'react-sizeme';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MainPath } from '../screens/MainScreen';
import { StyledLink } from '../atoms/StyledLink';
import { Theme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
}));

const TopMenu = function () {
  const { giftEvent } = useContext(EventContext);
  const classes = useStyles();
  const sidesProportion = 2;
  const mainProportion = 8;

  return (
    <div
      className={classes.root}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <AppBar position="sticky">
        <DeviceContextConsumer>
          {(context) => (
            <Toolbar style={{
              color: `${Theme.palette.text.primary}`,
              backgroundColor: `${Theme.palette.common.black}`,
              paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
              paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
            }}
            >
              <Grid container spacing={2}>
                <Grid item xs={context !== DeviceType.isDesktopOrLaptop ? sidesProportion : 0} />
                <Grid item xs={mainProportion}>
                  <Typography
                    variant={context === DeviceType.isDesktopOrLaptop ? 'h4' : 'h4'}
                    className={classes.title}
                    align={context === DeviceType.isDesktopOrLaptop ? 'center' : 'center'}
                    style={{
                      color: 'whitesmoke',
                      WebkitTapHighlightColor: 'transparent',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '48px' : '20px',
                      textAlign: context === DeviceType.isDesktopOrLaptop ? 'center' : 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}
                  >
                    <StyledLink
                      // eslint-disable-next-line no-nested-ternary
                      className={['pointerOverEffect', (giftEvent === undefined ? 'neonTextInProgress' : (context === DeviceType.isDesktopOrLaptop ? 'neonText' : 'neonTextMobile'))].join(' ')}
                      to={MainPath}
                    >
                      {'Christmas Secret Gifter'.toLocaleUpperCase()}
                    </StyledLink>
                  </Typography>
                </Grid>
                <Grid item xs={context !== DeviceType.isDesktopOrLaptop ? sidesProportion : 0} />
              </Grid>
            </Toolbar>
          )}
        </DeviceContextConsumer>
      </AppBar>
    </div>
  );
};

export default sizeMe({
  monitorHeight: true,
})(TopMenu);
