/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CenteredDiv from '../templates/CenteredDiv';
import ConfiguratorStepper from '../organisms/ConfiguratorStepper';
import { DeviceContextConsumer, EventContext } from '../../contexts';
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

let timer: any;

export const MainScreen = function () {
  const { giftEvent, startEvent } = useContext(EventContext);
  const [progress, setProgress] = React.useState(0);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    startEvent();
    timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 250);

    return () => {
      clearInterval(timer);
      source.cancel();
      // eslint-disable-next-line no-console
      console.log('request cancelled');
    };
  }, []);

  useEffect(() => {
    if (giftEvent === undefined) {
      startEvent(source.token);
      clearInterval(timer);
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 250);
    } else {
      clearInterval(timer);
      setProgress(100);
    }
  }, [giftEvent]);

  return (
    <DeviceContextConsumer>
      {() => (
        <CenteredDiv>
          {giftEvent && progress === 100 && (
            <ConfiguratorStepper />
          )}
          {!giftEvent && (
            <InitializationInProgress progress={progress} />
          )}
        </CenteredDiv>
      )}
    </DeviceContextConsumer>
  );
};
