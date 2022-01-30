import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EventContext } from '../../contexts/EventContext';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';

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
            <CenteredDiv>
              <CircularProgress color="secondary" />
            </CenteredDiv>
            )}
            {response && (
              <TableContainer
                component={Paper}
                sx={{
                //   maxHeight,
                }}
              >
                <Table
                  stickyHeader
                  aria-label="simple table"
                  size="small"
                >
                  <TableBody>
                    <TableRow
                      key={1}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell align="left">Analysis status:</TableCell>
                      <TableCell align="left">{response.analysisStatus}</TableCell>
                    </TableRow>
                    {!response.isError && (
                    <TableRow
                      key={2}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell align="left">Who is gifting Who:</TableCell>
                      <TableCell
                        align="left"
                        style={{
                          display: 'flex', flexDirection: 'column', gap: '10px',
                        }}
                      >
                        {!response.isError && (
                          response.pairs.flatMap((r) => (
                            <span>{`${getName(r.fromIndex)} is going to buy a gift for ${getName(r.toIndex)}`}</span>
                          ))
                        )}
                      </TableCell>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
