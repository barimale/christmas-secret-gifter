/* eslint-disable max-len */
import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DeviceContextConsumer, DeviceType } from '../../contexts';
import { Theme } from '../../theme/custom-theme';

export const CircularProgressWithLogo = (props: CircularProgressProps & { value: number }) => {
  const circleHeight = 120;
  const mobilecircleHeight = 50;
  const thickness = 3;
  const mobileThickness = 2;

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Box sx={{
          position: 'relative',
          display: 'inline-grid',
        }}
        >
          <CircularProgress
            variant="determinate"
            {...props}
            thickness={thickness}
            sx={{
              svg: {
                height: context === DeviceType.isDesktopOrLaptop ? circleHeight : mobilecircleHeight,
                width: 'auto',
                color: props.style?.color ?? `${Theme.palette.secondary.main}`,
              },
              alignItems: 'center',
              justifyContent: 'center',
              justifySelf: 'center',
              top: context === DeviceType.isDesktopOrLaptop ? circleHeight / 2 : mobilecircleHeight / 2,
              left: context === DeviceType.isDesktopOrLaptop ? -(circleHeight / 2) : -(mobilecircleHeight / 2),
              position: 'absolute',
            }}
          />
          <Box
            sx={{
              top: context === DeviceType.isDesktopOrLaptop ? 94 - (circleHeight / 2) + (thickness) : 62 - (mobilecircleHeight / 2) + (mobileThickness),
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <p style={{
              color: 'black',
              fontFamily: 'kgChristmasTrees',
              fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '80px' : '40px',
            }}
            />
          </Box>
        </Box>
      )}
    </DeviceContextConsumer>
  );
};
