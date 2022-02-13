import * as React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts';

export const Ornament = () => (
  <DeviceContextConsumer>
    {(context) => (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}
      >
        <img
          src="images/neon-wishes.png"
          alt="logo"
          style={{
            width: 'auto',
            height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
          }}
        />
        <img
          src="images/neon-wishes.png"
          alt="logo"
          style={{
            height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
            width: 'auto',
          }}
        />
        <img
          src="images/neon-wishes.png"
          alt="logo"
          style={{
            height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
            width: 'auto',
          }}
        />
      </div>
    )}
  </DeviceContextConsumer>
);
