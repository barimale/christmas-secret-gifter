import React from 'react';
import { Typography } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts';

export const InitializationInProgress = () => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        style={{
          padding: context.valueOf() === DeviceType.isDesktopOrLaptop
            ? '20px' : '2px',
          color: 'inherit',
        }}
      >
        <Typography
          style={{
            color: 'inherit',
            fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? '40px' : '20px',
            padding: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? '20px' : '10px',
          }}
        >
          Please wait a moment
        </Typography>
        <Typography
          style={{
            color: 'inherit',
            fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? '40px' : '20px',
            padding: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? '20px' : '10px',
            paddingTop: '0px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          Event creation is in progress
          <p
            className="animate-flicker-first"
            style={{
              margin: '0px',
              color: 'inherit',
              marginLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '6px' : '3px',
            }}
          >
            .
          </p>
          <p
            className="animate-flicker-second"
            style={{
              margin: '0px',
              color: 'inherit',
              marginLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '6px' : '3px',
            }}
          >
            .
          </p>
          <p
            className="animate-flicker-third"
            style={{
              margin: '0px',
              color: 'inherit',
              marginLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '6px' : '3px',
            }}
          >
            .
          </p>
        </Typography>
      </div>
    )}
  </DeviceContextConsumer>
);
