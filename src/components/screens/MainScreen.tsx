/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import CenteredDiv from '../templates/CenteredDiv';
import ConfiguratorStepper from '../organisms/ConfiguratorStepper';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { InitializationInProgress } from '../molecules/InitializationInProgress';

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
  const theme = useTheme();

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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '25px',
                  border: '0px solid #28749b',
                  // borderTop: `10px solid ${theme.palette.secondary.main}`,
                  borderLeft: `30px solid ${theme.palette.primary.main}`,
                  justifyContent: 'space-around',
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? '16px' : '10px',
                  backgroundColor: 'black',
                  marginBottom: '20px',
                  zIndex: 1000,
                  boxShadow: `${theme.shadows[0]}`,
                }}
              >
                <div style={{
                  backgroundColor: 'transparent',
                  padding: '0px',
                  margin: '0px',
                  color: 'white',
                }}
                >
                  <InitializationInProgress />
                </div>
              </div>

            </div>
          )}
        </CenteredDiv>
      )}
    </DeviceContextConsumer>
  );
};
