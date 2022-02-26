/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import LaunchIcon from '@material-ui/icons/Launch';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useStyles } from './styles';
import { ContactPath } from '../../screens/ContactScreen';
import { DeviceContextConsumer, DeviceType } from '../../../contexts';

const Footer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <footer
          className={classes.root}
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
          }}
        >
          <div
            className={classes.title}
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
            }}
          >
            <span style={{
              fontSize: '12px',
              fontFamily: 'Lora',
            }}
            >
              <Link
                className="pointerOverEffect"
                to={ContactPath}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                &copy; 2022 - barimale
              </Link>
            </span>
            <span style={{
              fontSize: '12px',
              fontFamily: 'Lora',
            }}
            >
                {context === DeviceType.isDesktopOrLaptop && (
                  <a
                    className="pointerOverEffect"
                    href="https://en.wikipedia.org/wiki/Christmas_tree"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      verticalAlign: 'left',
                    }}
                  >
                    Image used as a background of the website:
                    <i>Glade jul by Viggo Johansen (1891)</i>
                    [source: Wikipedia]
                    <LaunchIcon
                      style={{
                        paddingLeft: '6px',
                        height: '16px',
                        width: 'auto',
                        alignSelf: 'center',
                        color: 'silver',
                      }}
                    />
                  </a>
                )}
                {context === DeviceType.isTabletOrMobile && (
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Button
                      onClick={(e: any) => setOpen((prevState) => !prevState)}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        verticalAlign: 'left',
                      }}
                    >
                        <Tooltip
                          title="Image used as a background of the website: Glade jul by Viggo Johansen (1891) [source: https://en.wikipedia.org/wiki/Christmas_tree]"
                          open={open}
                          disableHoverListener
                          disableFocusListener
                        >
                          <span style={{
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            verticalAlign: 'left',
                          }}
                          >
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              fontSize: '8px',
                              wordBreak: 'break-word',
                            }}
                            >
                              {'External\nResources'}
                            </div>
                            <LaunchIcon
                              style={{
                                paddingLeft: '6px',
                                height: '16px',
                                width: 'auto',
                                alignSelf: 'center',
                                color: 'silver',
                              }}
                            />
                          </span>
                        </Tooltip>
                    </Button>
                  </ClickAwayListener>
                )}
            </span>
          </div>
        </footer>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorHeight: true,
})(Footer);
