import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

export default function ContactScreenContent () {
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
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            alignContent: 'center',
            // justifyContent: 'space-around',
            color: 'white',
            paddingBottom: 0,
            gap: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          }}
          >
            <a
              style={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'baseline',
                fontSize: 'inherit',
                paddingRight: '10px',
                paddingLeft: '10px',
              }}
              href="https://github.com/barimale"
              target="_blank"
              rel="noreferrer"
            >
              {'GitHub'.toUpperCase()}
              <LaunchIcon
                style={{
                  paddingLeft: context === DeviceType.isDesktopOrLaptop ? '6px' : '2px',
                  height: context === DeviceType.isDesktopOrLaptop ? '32px' : '26px',
                  width: 'auto',
                  alignSelf: 'center',
                  color: 'silver',
                }}
              />
            </a>
            <a
              className="pointerOverEffect"
              href="https://en.wikipedia.org/wiki/Christmas_tree"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'baseline',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                paddingRight: '10px',
                paddingLeft: '10px',
              }}
            >
              <p style={{
                padding: '0px',
                margin: '0px',
              }}
              >
                Image used as a background of the website:
                <i>Glade jul by Viggo Johansen (1891)</i>
                [source: Wikipedia]
              </p>
              <LaunchIcon
                style={{
                  paddingLeft: context === DeviceType.isDesktopOrLaptop ? '6px' : '2px',
                  height: context === DeviceType.isDesktopOrLaptop ? '32px' : '26px',
                  width: 'auto',
                  alignSelf: 'center',
                  color: 'silver',
                }}
              />
            </a>
          </div>

        </div>
      )}
    </DeviceContextConsumer>
  );
}
