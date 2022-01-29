import React, { useContext, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { EventContext } from '../../contexts/EventContext';
import AlgorithmResponse from '../../store/model/algorithm-response';
import LoadingInProgress from '../molecules/LoadingInProgress';

const MatchParticipants = () => {
  const { participants, analyze } = useContext(EventContext);
  const [response, setResponse] = useState<AlgorithmResponse | undefined>(undefined);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  useEffect(() => {
    async function AnalyzeAsync () {
      setIsInProgress(true);
      const result = await analyze();
      setResponse(result);
      setIsInProgress(false);
    }

    AnalyzeAsync();
  }, []);

  function getName (orderId: number): string | undefined | null {
    // const found = participants.find((p) => p.orderId === orderId);
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'whitesmoke',
      padding: '20px',
      height: '100%',
      paddingTop: '20px',
      paddingBottom: '0px',
    }}
    >
      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
      }}
      >
        {participants.length > 0 ? (
          <>
            {(response === undefined || isInProgress) && (
            <LoadingInProgress />
            )}
            {response && (
            <Typography
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
              }}
            >
              <span>
                <b>Analysis result:</b>
                {response.analysisStatus}
              </span>
              {response.isError && (
              <span>
                Negative cause:
                {response.reason}
              </span>
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
    </div>
  );
};

export default MatchParticipants;
