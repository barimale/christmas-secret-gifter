import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Fade, useTheme } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import { Languages } from './Languages';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

const LanguageSetter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { i18n } = useTranslation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <div style={{
            left: context === DeviceType.isDesktopOrLaptop ? 'unset' : '90%',
            position: context === DeviceType.isDesktopOrLaptop ? 'relative' : 'absolute',
            WebkitTransform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
            transform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
          }}
          >
            <IconButton
              style={{
                color: `${theme.palette.common.white}`,
              }}
              aria-controls="language-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  className="pointerOverEffect"
                  style={{
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? 16 : 14,
                    width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '100px' : '62px',
                    fontWeight: 'normal',
                    textAlign: 'center',
                    verticalAlign: 'center',
                    alignContent: 'baseline',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <TranslateIcon
                    fontSize="small"
                    style={{
                      paddingRight: '10px', height: '100%',
                    }}
                  />
                  {i18n.language.toUpperCase()}
                </div>
              </div>
            </IconButton>
          </div>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            keepMounted
            marginThreshold={0}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorReference="anchorEl"
            anchorPosition={
              context.valueOf() === DeviceType.isDesktopOrLaptop
                ? undefined
                : undefined
            }
            anchorOrigin={
              context.valueOf() === DeviceType.isDesktopOrLaptop
                ? {
                  vertical: 'bottom',
                  horizontal: 'center',
                } : {
                  vertical: 'bottom',
                  horizontal: 'center',
                }
            }
            transformOrigin={
              context.valueOf() === DeviceType.isDesktopOrLaptop
                ? {
                  vertical: 'top',
                  horizontal: 'center',
                }
                : {
                  vertical: 'top',
                  horizontal: 'center',
                }
            }
          >
            <Languages handleClose={handleClose} />
          </Menu>
        </>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorWidth: true,
})(LanguageSetter);
