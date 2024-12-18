/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Theme as customTheme } from '../../theme/custom-theme';

export default function ContactScreenContent() {
  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          color: 'white',
          paddingBottom: 0,
          fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          zIndex: 1000,
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            alignContent: 'center',
            // justifyContent: 'space-around',
            color: 'white',
            maxWidth: 0.8 * window.innerWidth,
            paddingBottom: 0,
            gap: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          }}
          >
            <a
              className="pointerOverEffect"
              style={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                padding: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                backgroundColor: `${customTheme.palette.secondary.light}`,
                borderRadius: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
              }}
              href="https://github.com/barimale"
              target="_blank"
              rel="noreferrer"
            >
              {'https://github.com/barimale'.toUpperCase()}
              <LaunchIcon
                style={{
                  paddingLeft: context === DeviceType.isDesktopOrLaptop ? '6px' : '2px',
                  height: context === DeviceType.isDesktopOrLaptop ? '32px' : '26px',
                  width: 'auto',
                  alignSelf: 'center',
                  color: 'black',
                  opacity: 'inherit',
                }}
              />
            </a>
          </div>
        </div>
      )}
    </DeviceContextConsumer>
  );
}
