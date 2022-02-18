import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts';
import { ModalTitle } from './ModalTitle';
import { CircularProgressWithLogo } from './CircularProgressWithLogo';
import { CircularProgressWithLogoWrapper } from './CircularProgressWithLogoWrapper';

interface Props{
  progress: number;
}

export const InitializationInProgress = (props: Props) => (
  <DeviceContextConsumer>
    {(context) => (
      <Box
        boxShadow={10}
        style={{
          height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '42%' : '35%',
          width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30%' : '60%',
          backgroundColor: 'whitesmoke',
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
          <ModalTitle title="Initialization" />
          <div style={{
            backgroundColor: 'white',
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
                }}
              />
            </CircularProgressWithLogoWrapper>
            <div style={{
              alignSelf: 'center',
              paddingTop: '10px',
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
                }}
              >
                Please wait a moment.
                <br />
                Event creation is in progress...
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    )}
  </DeviceContextConsumer>
);
