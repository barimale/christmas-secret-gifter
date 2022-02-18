import React from 'react';
import Fade from '@material-ui/core/Fade';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts';
import { ModalTitle } from './ModalTitle';

interface Props{
  progress: number;
}
export const InitializationInProgress = (props: Props) => (
  <DeviceContextConsumer>
    {(context) => (
      <Box
        boxShadow={10}
        style={{
          height: 'auto',
          width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40%' : '90%',
          minHeight: window.innerHeight * 0.5,
          backgroundColor: 'white',
          zIndex: 1000,
        }}
      >
        <Fade
          in
          style={{
            width: '100%',
            height: '100%',
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
              alignItems: 'center',
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
                }}
              >
                Please wait a moment.
              </Typography>
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
                }}
              >
                Event creation is in progress...
              </Typography>
              <CircularProgress variant="determinate" value={props.progress} />
            </div>
          </div>
        </Fade>
      </Box>
    )}
  </DeviceContextConsumer>
);
