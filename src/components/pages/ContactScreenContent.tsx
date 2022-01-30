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
            {'https://github.com/barimale'.toUpperCase()}
          </div>

        </div>
      )}
    </DeviceContextConsumer>
  );
}
