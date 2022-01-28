import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { EventContext } from '../../contexts/EventContext';
import { AnalyzeButton } from '../molecules/AnalyzeButton';
import AlgorithmResponse from '../../store/model/algorithm-response';

const MatchParticipants = () => {
  const { participants } = useContext(EventContext);
  const [response, setResponse] = useState<AlgorithmResponse | undefined>(undefined);

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {participants.length > 0 ? (
        <>
          <AnalyzeButton
            onAnalyzeFinished={(response: AlgorithmResponse | undefined) => {
              setResponse(response);
            }}
          />
          {response && (
            <p>{JSON.stringify(response)}</p>
          )}
        </>
      ) : (
        <p>Something went wrong</p>
      )}
    </Paper>
  );
};

export default MatchParticipants;
