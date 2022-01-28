import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@material-ui/core';
import { EventContext } from '../../contexts/EventContext';
import { AnalyzeButton } from '../molecules/AnalyzeButton';
import AlgorithmResponse from '../../store/model/algorithm-response';

const MatchParticipants = () => {
  const { participants } = useContext(EventContext);
  const [response, setResponse] = useState<AlgorithmResponse | undefined>(undefined);

  function getName (orderId: number): string | undefined | null {
    // const found = participants.find((p) => p.orderId === orderId);
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

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
          {response === undefined && (
          <AnalyzeButton
            onAnalyzeFinished={(response: AlgorithmResponse | undefined) => {
              setResponse(response);
            }}
          />
          )}
          {response && (
            <Typography
              style={{
                border: response.isError ? '2px solid red' : '1px solid green',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
              }}
            >
              <span>{response.analysisStatus}</span>
              {response.isError && (
              <span>{response.reason}</span>
              )}
              {!response.isError && (
                response.pairs.flatMap((r) => (
                  <span>{`${getName(r.fromIndex)} is going to buy a gift for ${getName(r.toIndex)}`}</span>
                ))
              )}
            </Typography>
          )}
        </>
      ) : (
        <p>Something went wrong</p>
      )}
    </Paper>
  );
};

export default MatchParticipants;
