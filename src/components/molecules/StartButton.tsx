import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';

export const StartButton = function () {
  const { startEvent } = useContext(EventContext);

  return (
    <Button
      variant="outlined"
      onClick={async () => {
        await startEvent();
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
  );
};
