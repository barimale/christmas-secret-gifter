/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import { hexToRgb } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BackgroundContext, DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { BackgroundColorMode } from '../../contexts/BackgroundContext';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';
import { CopyPairsToClipboard } from '../molecules/CopyPairsToClipboard';
import { PairRow } from '../molecules/PairRow';
import { Gifts } from '../molecules/Gifts';
import { RGBToRGBA } from '../../utilities/customTheme';

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
        <div
          id={context === DeviceType.isDesktopOrLaptop ? 'iconedBackground' : 'iconedBackground-mobile'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'whitesmoke',
            padding: '20px',
            height: '74%',
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
                <>
                  {(!response.isError || (response.analysisStatus?.toLocaleLowerCase() === 'optimal' && response.analysisStatus?.toLocaleLowerCase() === 'feasible')) ? (
                    <TableContainer
                      component={Paper}
                      sx={{
                        height: '100%',
                        marginBottom: '0px',
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
                              {!response.isError && (
                              <Gifts style={{
                                color: 'black',
                              }}
                              />
                              )}
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
                              }}
                              >
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
                          <TableRow
                            key={10}
                          >
                            <TableCell
                              sx={{
                              }}
                              colSpan={2}
                            >
                              Who is going to buy a gift to whom:
                            </TableCell>
                          </TableRow>
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
                              colSpan={2}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '100%',
                              }}
                            >
                              <List
                                style={{
                                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                  marginTop: '0px',
                                  width: '100%',
                                  flexGrow: 1,
                                }}
                              >
                                {response.pairs.flatMap((r, index) => (
                                  <PairRow pair={r} index={index} />
                                ))}
                              </List>
                            </TableCell>
                          </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                    : (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '25px',
                          border: '1px dotted #8b0000',
                          justifyContent: 'space-around',
                          fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                            ? '16px' : '10px',
                          backgroundColor: 'white',
                          marginBottom: '20px',
                        }}
                      >
                        <div style={{
                          backgroundColor: `${RGBToRGBA(hexToRgb('#8b0000'), 0.1)}`,
                          padding: '0px',
                          margin: '0px',
                        }}
                        >
                          <p style={{
                            paddingLeft: '25px',
                            paddingRight: '25px',
                            textAlign: 'justify',
                            lineHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '1.5' : '1.5',
                          }}
                          >
                            Solution for such exclusions is not feasible. You need to go back to the previous step and correct data.
                          </p>
                        </div>
                      </div>
                    )}
                </>
              )}
            </>
          ) : (
            <p>Something went wrong.</p>
          )}
        </div>
      )}
    </DeviceContextConsumer>
  );
};

export default MatchParticipants;
