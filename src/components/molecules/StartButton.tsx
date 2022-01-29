import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';

export const StartButton = function () {
  const { startEvent } = useContext(EventContext);

  return (
    <Button
      className="pointerOverEffect"
      variant="contained"
      color="secondary"
      onClick={async () => {
        await startEvent();
      }}
      style={{
        fontSize: '40px',
        boxShadow: `${customTheme.shadows[10]}`,
        textShadow: '1px 1px white',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '30px',
        paddingRight: '30px',
        border: '8px solid green',
        padding: '30px ',
      }}
    >
      <Typography
        style={{
          fontSize: '30px',
        }}
      >
        Let&apos;s begin
      </Typography>
    </Button>
  );
};
