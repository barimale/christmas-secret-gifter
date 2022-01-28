import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';
import { ParticipantsGrid } from '../molecules';

const DefineParticipants = () => {
  const { giftEvent, restartEvent } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <>
      {giftEvent ? (
        <ParticipantsGrid title={giftEvent.eventId ?? undefined} />
      ) : (
        <p>Something went wrong...</p>
      )}
      <Button
        variant="outlined"
        disabled={isInProgress}
        onClick={async () => {
          setIsInProgress(true);
          restartEvent();
          setIsInProgress(false);
        }}
        style={{
          fontSize: '10px',
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
          <p>RESTART</p>
        </div>
      </Button>
    </>
  );
};

export default DefineParticipants;
