import React from 'react';
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
            display: 'flex', flexDirection: 'column', justifyContent: 'end',
          }}
          >
            <a
              style={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              href="https://github.com/barimale"
              target="_blank"
              rel="noreferrer"
            >
              {'https://github.com/barimale'.toUpperCase()}

            </a>
          </div>

        </div>
      )}
    </DeviceContextConsumer>
  );
}
