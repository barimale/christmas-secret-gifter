import React, { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import AlgorithmResponse from '../../store/model/algorithm-response';
import CenteredDiv from '../templates/CenteredDiv';
import { CopyPairsToClipboard } from '../molecules/CopyPairsToClipboard';
import Pair from '../../store/model/pair';

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
                              <List style={{
                                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                                marginTop: '0px',
                              }}
                              >
                                {response.pairs.flatMap((r) => (
                                  <PairRow pair={r} />
                                ))}
                              </List>
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

interface PairRowProps{
  pair: Pair;
}

const PairRow = (props: PairRowProps) => {
  const { pair } = props;
  const { participants } = useContext(EventContext);

  function getName (orderId: number): string | undefined | null {
    const found = participants[orderId];

    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  function isLast (orderId: number): boolean {
    const found = participants[orderId];
    const last = participants[participants.length];

    if (found !== undefined && last !== undefined) {
      return found.id === last.id;
    }

    return false;
  }

  function stringToColor (input: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < input.length; i += 1) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar (name: string) {
    const splitted = name.split(' ');
    const firstLettersOnly = splitted.flatMap((p) => p[0]).join('');

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstLettersOnly.slice(0, 2)}`,
    };
  }

  const gifterName = getName(pair.fromIndex) ?? '';

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <ListItem
            alignItems="flex-start"
            style={{
              fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
            }}
          >
            <ListItemAvatar>
              <Avatar alt={gifterName} {...stringAvatar(gifterName)} />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '14px',
              }}
              primary={gifterName}
              secondary={(
                <Typography
                  sx={{
                    display: 'inline',
                  }}
                  style={{
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`is going to buy a gift to ${getName(pair.toIndex)}`}
                </Typography>
          )}
            />
          </ListItem>
          {!isLast(pair.fromIndex) && (
          <Divider variant="inset" component="li" />
          )}
        </>
      )}
    </DeviceContextConsumer>
  );
};

export default MatchParticipants;
