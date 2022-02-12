import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';
import { CopyPairsToClipboard } from '../molecules/CopyPairsToClipboard';

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
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'whitesmoke',
          padding: '20px',
          height: '75%',
          paddingTop: '20px',
          paddingBottom: '0px',
        }}
        >
          <Paper sx={{
            width: '100%',
            overflow: 'hidden',
            height: (response === undefined || isInProgress) ? '92%' : 'unset',
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
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">RESULT</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={1}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell
                          align="left"
                        >
                          Analysis status:
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '12px',
                            color: response.analysisStatus?.toLocaleLowerCase() === 'optimal' || response.analysisStatus?.toLocaleLowerCase() === 'feasible' ? 'white' : 'black',
                            backgroundColor: response.analysisStatus?.toLocaleLowerCase() === 'optimal' || response.analysisStatus?.toLocaleLowerCase() === 'feasible' ? 'green' : 'red',
                          }}
                        >
                          {response.analysisStatus}
                        </TableCell>
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
                        <TableCell
                          align="left"
                        >
                          Who is going to buy a gift to whom:
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            maxHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '200px' : '120px',
                          }}
                        >
                          {!response.isError && (
                            <>
                              <CopyPairsToClipboard
                                content={
                                response.pairs.flatMap((r) => (
                                  `${getName(r.fromIndex)} is going to buy a gift to ${getName(r.toIndex)}\n`))
                                }
                              />
                              <ol style={{
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                marginTop: '0px',
                              }}
                              >
                                {response.pairs.flatMap((r) => (
                                  <li style={{
                                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                  }}
                                  >
                                    <span
                                      style={{
                                        fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                      }}
                                    >
                                      {`${getName(r.fromIndex)} is going to buy a gift to ${getName(r.toIndex)}`}
                                    </span>
                                  </li>
                                ))}
                              </ol>
                            </>
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
      )}
    </DeviceContextConsumer>
  );
};

export default MatchParticipants;
