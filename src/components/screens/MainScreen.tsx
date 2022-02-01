/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CenteredDiv from '../templates/CenteredDiv';
import ConfiguratorStepper from '../organisms/ConfiguratorStepper';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { GiftIcon } from '../molecules/GiftIcon';

export const Path = '/';
export const Title = 'Events';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontFamily: 'Lora',
  },
}));

export const MainScreen = function () {
  const { giftEvent, startEvent } = useContext(EventContext);

  useEffect(() => {
    startEvent();
  }, []);

  useEffect(() => {
    if (giftEvent === undefined) {
      startEvent();
    }
  }, [giftEvent]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <CenteredDiv>
          {giftEvent && (
          <ConfiguratorStepper />
          )}
          {!giftEvent && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            >
              <GiftIcon height={context.valueOf() === DeviceType.isDesktopOrLaptop
                ? '300px' : '100px'}
              />
              <Typography style={{
                color: 'white',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? '40px' : '20px',
              }}
              >
                Please wait a moment. Event creation is in progress...
              </Typography>
            </div>
          )}
        </CenteredDiv>
      )}
    </DeviceContextConsumer>
  );
};
