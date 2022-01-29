import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import ParkIcon from '@mui/icons-material/Park';
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
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
    >
      <ParkIcon fontSize="large" />
      <p>START</p>
    </Button>
  );
};
