/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CenteredDiv from '../templates/CenteredDiv';
import ConfiguratorStepper from '../organisms/ConfiguratorStepper';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { GiftIcon } from '../atoms/GiftIcon';

export const MainPath = '/';
export const MainTitle = 'Events';

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
              <div className="rotating">
                <GiftIcon
                  height={context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '300px' : '100px'}
                />
              </div>
              <div
                style={{
                  padding: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '20px' : '2px',
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                      ? '40px' : '20px',
                    padding: context.valueOf() === DeviceType.isDesktopOrLaptop
                      ? '20px' : '10px',
                  }}
                >
                  Please wait a moment.
                </Typography>
                <Typography
                  style={{
                    color: 'white',
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
                    }}
                  >
                    .
                  </p>
                  <p
                    className="animate-flicker-second"
                    style={{
                      margin: '0px',
                    }}
                  >
                    .
                  </p>
                  <p
                    className="animate-flicker-third"
                    style={{
                      margin: '0px',
                    }}
                  >
                    .
                  </p>
                </Typography>
              </div>
            </div>
          )}
        </CenteredDiv>
      )}
    </DeviceContextConsumer>
  );
};
