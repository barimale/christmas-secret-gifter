import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts';
import { CircularProgressWithLogo } from './CircularProgressWithLogo';
import { CircularProgressWithLogoWrapper } from './CircularProgressWithLogoWrapper';
import { Theme } from '../../theme/custom-theme';

interface Props{
  progress: number;
}

export const InitializationInProgress = (props: Props) => (
  <DeviceContextConsumer>
    {(context) => (
      <Box
        style={{
          height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '42%' : '35%',
          width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30%' : '60%',
          backgroundColor: 'transparent',
          zIndex: 1000,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'stretch',
          height: '100%',
        }}
        >
          <div style={{
            backgroundColor: 'transparent',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <CircularProgressWithLogoWrapper style={{
              height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '140px' : '100px',
              marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '50px' : '10px',
            }}
            >
              <CircularProgressWithLogo
                value={props.progress}
                style={{
                  color: `${Theme.palette.secondary.main}`,
                  opacity: '0.5',
                }}
              />
            </CircularProgressWithLogoWrapper>
            <div style={{
              alignSelf: 'center',
              paddingTop: '10px',
              backgroundColor: 'transparent',
              width: '100%',
              display: 'flex',
              justifyItems: 'center',
              color: 'whitesmoke',
            }}
            >
              <Typography
                style={{
                  color: 'inherit',
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '20px' : '12px',
                  padding: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '20px' : '10px',
                  paddingTop: '0px',
                  display: 'flex',
                  flexDirection: 'row',
                  fontFamily: [
                    'Nanum-Gothic', 'sans-serif',
                  ].join(','),
                  width: '100%',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Please wait a moment.
                Event creation is in progress...
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    )}
  </DeviceContextConsumer>
);
