/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState, useEffect, ReactNode } from 'react';
import _ from 'lodash';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import html2canvas from 'html2canvas';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import List from '@mui/material/List';
import { hexToRgb } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BackgroundContext, DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { BackgroundColorMode } from '../../contexts/BackgroundContext';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';
import { CopyPairsToClipboard } from '../molecules/CopyPairsToClipboard';
import { ConvertToPdfButton } from '../molecules/ConvertToPdfButton';
import { PairRow } from '../molecules/PairRow';
import { RGBToRGBA } from '../../utilities/customTheme';
import PairingResultsRow from '../molecules/PairingResultsRow';

const styles = StyleSheet.create({
  image: {
    objectFit: 'cover',
  },
});

const MatchParticipants = () => {
  const { participants, analyze } = useContext(EventContext);
  const { setBackgroundMode } = useContext(BackgroundContext);
  const [response, setResponse] = useState<AlgorithmResponse | undefined>(undefined);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const ref = React.useRef(null);
  const pairsRef = React.useRef<HTMLElement[]>([]);
  const [nodes, setnodes] = useState<ReactNode[]>([]);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    async function AnalyzeAsync() {
      setIsInProgress(true);
      const result = await analyze(source.token);
      setResponse(result);
      setIsInProgress(false);
    }

    AnalyzeAsync();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    async function ToImageViewsAsync() {
      async function ToImageView(element: HTMLElement): Promise<ReactNode> {
        if (element === null || element === undefined) {
          return (
            <View>
              <Text>
                Element from DOM is null
              </Text>
            </View>
          );
        }

        const oldWidth = element.style.width;
        const oldHeight = element.style.height;
        const width = 890.5;
        const height = 94;
        element.style.width = width.toString() + 'px';
        element.style.height = height.toString() + 'px';

        const result = html2canvas(
          element,
          {
            logging: false,
            useCORS: true,
            foreignObjectRendering: false,
            scale: 1,
            width: width * 3,
            height: height * 3,
          },
        )
          .then((asBuffer) => (
            <View style={{
              margin: 10,
              padding: 10,
            }}
            >
              <Image
                style={[styles.image,
                {
                  height,
                  width,
                }]}
                cache={false}
                source={asBuffer.toDataURL('image/png', 1.0)}
              />
            </View>
          ))
          .catch((error: any) => (
            <View>
              <Text>
                {error}
              </Text>
            </View>
          ));

        element.style.width = oldWidth;
        element.style.height = oldHeight;

        return result;
      }

      // eslint-disable-next-line no-unused-vars
      const allOfThem: Array<ReactNode> = [];
      _.forEach(pairsRef.current, async (r: HTMLElement) => {
        await ToImageView(r).then((result: ReactNode) => {
          allOfThem.push(result);
        });
      });

      setnodes(allOfThem);
    }

    ToImageViewsAsync();
  }, [pairsRef.current.length]);

  useEffect(() => {
    if (response && response.analysisStatus?.toLocaleLowerCase() === 'infeasible') {
      setBackgroundMode(BackgroundColorMode.error);
    }
  }, [response]);

  function getName(orderId: number): string | undefined | null {
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
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}
                            >
                              {!response.isError && (
                                <>
                                  <ConvertToPdfButton
                                    content={nodes}
                                  />
                                  {/* {context.valueOf() === DeviceType.isDesktopOrLaptop && (
                                    // <Gifts
                                    //   style={{
                                    //     color: 'black',
                                    //   }}
                                    // />
                                  )} */}
                                </>
                              )}
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
                          <TableRow key={33}>
                            <PairingResultsRow />
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
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '10px',
                                  justifyContent: 'center',
                                }}
                              >
                                <List
                                  ref={ref}
                                  style={{
                                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                    marginTop: '0px',
                                  }}
                                >
                                  {response.pairs.flatMap((r, index) => (
                                    // eslint-disable-next-line no-return-assign
                                    <PairRow
                                      pair={r}
                                      index={index}
                                      ref={(el) => {
                                        if (el !== null) {
                                          (pairsRef.current[index] = el);
                                        }
                                      }}
                                    />
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
