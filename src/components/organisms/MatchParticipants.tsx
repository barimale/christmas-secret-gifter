import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BackgroundContext, DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { BackgroundColorMode } from '../../contexts/BackgroundContext';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';
import { CopyPairsToClipboard } from '../molecules/CopyPairsToClipboard';
import { PairRow } from '../molecules/PairRow';

const MatchParticipants = () => {
  const { participants, analyze } = useContext(EventContext);
  const { setBackgroundMode } = useContext(BackgroundContext);
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

  useEffect(() => {
    if (response && response.analysisStatus?.toLocaleLowerCase() === 'infeasible') {
      setBackgroundMode(BackgroundColorMode.error);
      // eslint-disable-next-line no-console
      console.log('error');
    }
  }, [response]);

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
                    // maxHeight: 400,
                    height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '92%' : '95%',
                  }}
                >
                  <Table
                    stickyHeader
                    aria-label="simple table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{
                          }}
                        >
                          RESULT
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                          }}
                        >
                          {!response.isError && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '10px',
                              justifyContent: 'end',
                              alignItems: 'center',
                              maxHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '200px' : '120px',
                            }}
                            >
                              <p style={{
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '14px' : '8px',
                                color: 'black',
                                margin: '0px',
                              }}
                              >
                                Copy to Clipboard:
                              </p>
                              <CopyPairsToClipboard
                                content={
                                response.pairs.flatMap((r) => (
                                  `${getName(r.fromIndex)} is going to buy a gift to ${getName(r.toIndex)}\n`))
                                }
                              />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(response.analysisStatus?.toLocaleLowerCase() !== 'optimal' && response.analysisStatus?.toLocaleLowerCase() !== 'feasible') && (
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
                          style={{
                          }}
                        >
                          Analysis status:
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '12px',
                            color: response.analysisStatus?.toLocaleLowerCase() === 'optimal' || response.analysisStatus?.toLocaleLowerCase() === 'feasible' ? 'white' : 'black',
                            borderColor: response.analysisStatus?.toLocaleLowerCase() === 'optimal' || response.analysisStatus?.toLocaleLowerCase() === 'feasible' ? 'green' : 'lightgrey',
                            borderRadius: '10px',
                          }}
                        >
                          {response.analysisStatus}
                        </TableCell>
                      </TableRow>
                      )}
                      {!response.isError && (
                      <TableRow
                        key={3}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            borderBottom: 0,
                          },
                        }}
                      >
                        <TableCell
                          align="left"
                          rowSpan={2}
                          style={{
                            borderRight: '1px solid rgb(224, 224, 224) !important',
                          }}
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
                            <List
                              style={{
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                marginTop: '0px',
                              }}
                            >
                                {response.pairs.flatMap((r, index) => (
                                  <PairRow pair={r} index={index} />
                                ))}
                            </List>
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
        </div>
      )}
    </DeviceContextConsumer>
  );
};

export default MatchParticipants;
