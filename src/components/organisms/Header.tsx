import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import sizeMe from 'react-sizeme';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import MenuButtons from './menu/menu-desktop/MenuButtons';
import { MainPath } from '../screens/MainScreen';
import { StyledLink } from '../atoms/StyledLink';
import { Theme } from '../../theme/custom-theme';

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
  const classes = useStyles();

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
              <Typography
                variant={context === DeviceType.isDesktopOrLaptop ? 'h4' : 'h4'}
                className={classes.title}
                align={context === DeviceType.isDesktopOrLaptop ? 'left' : 'center'}
                style={{
                  color: 'whitesmoke',
                  WebkitTapHighlightColor: 'transparent',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '48px' : '20px',
                  textAlign: context === DeviceType.isDesktopOrLaptop ? 'left' : 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                }}
              >
                <StyledLink
                  className={context === DeviceType.isDesktopOrLaptop ? 'pointerOverEffect' : ''}
                  to={MainPath}
                >
                  <img
                    src="images/neon-tree-small.png"
                    alt="logo"
                    style={{
                      paddingRight: context === DeviceType.isDesktopOrLaptop ? '12px' : '6px',
                      // marginBottom: context === DeviceType.isDesktopOrLaptop ? '-1px' : '-1px',
                      height: context === DeviceType.isDesktopOrLaptop ? '38px' : '20px',
                      width: 'auto',
                    }}
                  />
                  {'Christmas Secret Gifter'.toLocaleUpperCase()}
                </StyledLink>
              </Typography>
              {context === DeviceType.isDesktopOrLaptop && (
                <MenuButtons />
              )}
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
