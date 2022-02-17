import * as React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts';

interface GiftsProps {
  style?: React.CSSProperties;
}

export const Gifts = (props: GiftsProps) => (
  <DeviceContextConsumer>
    {(context) => (
      <div style={props.style}>
        <div style={{
          width: 'auto',
          height: 'auto',
          fontFamily: 'kgChristmasTrees',
          color: 'inherit',
          gap: context.valueOf() === DeviceType.isDesktopOrLaptop ? '10px' : '5px',
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'stretch',
          alignItems: 'center',
          fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '16px',
        }}
        >
          <p style={{
            color: 'inherit',
            fontFamily: 'inherit',
            margin: '0px',
            padding: '0px',
            height: 'fit-content',
          }}
          >
            D
          </p>
          <p style={{
            color: 'inherit',
            fontFamily: 'inherit',
            margin: '0px',
            padding: '0px',
            height: 'fit-content',
          }}
          >
            D
          </p>
          <p style={{
            color: 'inherit',
            fontFamily: 'inherit',
            margin: '0px',
            padding: '0px',
            height: 'fit-content',
          }}
          >
            D
          </p>
          <p style={{
            color: 'inherit',
            fontFamily: 'inherit',
            margin: '0px',
            padding: '0px',
            height: 'fit-content',
          }}
          >
            D
          </p>
          <p style={{
            fontFamily: 'inherit', margin: '0px', padding: '0px', height: 'fit-content', color: 'inherit',
          }}
          >
            D
          </p>
        </div>
      </div>
    )}
  </DeviceContextConsumer>
);
