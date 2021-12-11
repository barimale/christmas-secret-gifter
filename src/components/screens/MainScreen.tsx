import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { EventContext } from '../../contexts/CartContext';
import { EventWizard } from '../organisms/event-wizard/getSteps';
import { StartEvent } from '../organisms/event-wizard/StartEvent';

export const Path = "/";
export const Title = "Events"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: "Montserrat"
    },
  }),
);

export function MainScreen(){
  const { getParticipantsAmount } = useContext(EventContext);
  const [ wizardInProgress ] = useState<boolean>(getParticipantsAmount() > 0);
  
  return(
      getParticipantsAmount() > 0  || wizardInProgress? (
          <EventWizard />
      ):(
          <StartEvent />
      )
  );
}

