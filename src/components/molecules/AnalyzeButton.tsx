/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';
import AlgorithmResponse from '../../store/model/algorithm-response';

interface Props{
  onAnalyzeFinished: (response: AlgorithmResponse | undefined) => void;
}

export const AnalyzeButton = (props: Props) => {
  const { analyze } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <Button
      variant="outlined"
      disabled={isInProgress}
      onClick={async () => {
        setIsInProgress(true);
        const result = await analyze();
        props.onAnalyzeFinished(result);
        setIsInProgress(false);
      }}
      style={{
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
        <p>PAIR!</p>
      </div>
    </Button>
  );
};
