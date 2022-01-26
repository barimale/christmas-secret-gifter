import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CenteredDiv from '../templates/CenteredDiv';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';
import GiftEvent from '../../store/model/gift-event';

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
  const { startEvent } = useContext(EventContext);
  const [event, setEvent] = useState<GiftEvent | undefined>(undefined);

  return (
    <CenteredDiv>
      {!event && (
      <Button
        variant="outlined"
        onClick={async () => {
          const result = await startEvent();
          setEvent(result);
        }}
        style={{
          fontSize: '40px',
          backgroundColor: 'grey',
          boxShadow: `${customTheme.shadows[10]}`,
          textShadow: '1px 1px white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <p>START</p>
        </div>
      </Button>
      )}
      {event && (
        <p>{event.eventId}</p>
      )}
    </CenteredDiv>
  );
};
