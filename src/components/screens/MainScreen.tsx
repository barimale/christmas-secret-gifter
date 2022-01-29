/* eslint-disable arrow-body-style */
import React, { useContext, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CenteredDiv from '../templates/CenteredDiv';
import { EventContext } from '../../contexts';
import ConfiguratorStepper from '../organisms/ConfiguratorStepper';

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
    <CenteredDiv>
      {giftEvent && (
        <ConfiguratorStepper />
      )}
    </CenteredDiv>
  );
};
