/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import sizeMe from 'react-sizeme';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MainPath } from '../screens/MainScreen';
import { StyledLink } from '../atoms/StyledLink';
import { Theme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';
import useOverEffectHook from '../../hooks/useOverEffectHook';

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

const TopMenu = () => {
  const { giftEvent } = useContext(EventContext);
  const classes = useStyles();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const hoverDesktopRef = useRef(null);
  const opacityDesktopValue = useOverEffectHook(hoverRef);

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
              paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px' : '2px',
              paddingBottom: context === DeviceType.isDesktopOrLaptop ? '10px' : '2px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Typography
                variant={context === DeviceType.isDesktopOrLaptop ? 'h4' : 'h4'}
                className={classes.title}
                align={context === DeviceType.isDesktopOrLaptop ? 'center' : 'center'}
                style={{
                  color: 'whitesmoke',
                  WebkitTapHighlightColor: 'transparent',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '46px' : '30px',
                  textAlign: context === DeviceType.isDesktopOrLaptop ? 'center' : 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginLeft: context === DeviceType.isDesktopOrLaptop ? '-50px' : '0px',
                  opacity: giftEvent === undefined ? '0.67' : '1',
                }}
              >
                {context === DeviceType.isDesktopOrLaptop ? (
                  <StyledLink
                    // eslint-disable-next-line no-nested-ternary
                    className={[(giftEvent === undefined ? 'neonTextInProgress' : 'neonText')].join(' ')}
                    to={MainPath}
                    ref={hoverDesktopRef}
                    style={{
                      whiteSpace: 'break-spaces',
                      opacity: opacityDesktopValue,
                    }}
                  >
                    {'Christmas Secret Gifter'.toLocaleUpperCase()}
                  </StyledLink>
                ) : (
                  <StyledLink
                    // eslint-disable-next-line no-nested-ternary
                    className={[(giftEvent === undefined ? 'neonTextInProgress' : 'neonTextMobile')].join(' ')}
                    to={MainPath}
                    ref={hoverRef}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      fontSize: 'inherit',
                      gap: '4px',
                      padding: '4px',
                      opacity: opacityValue,
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 'inherit',
                        padding: '0px',
                        lineHeight: 1,
                      }}
                    >
                      {'Christmas'.toLocaleUpperCase()}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: 'inherit',
                        padding: '0px',
                        lineHeight: 1,
                      }}
                    >
                      {'Secret Gifter'.toLocaleUpperCase()}
                    </Typography>
                  </StyledLink>
                )}
              </Typography>
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
