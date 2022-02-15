/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { BackgroundContext, DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { BackgroundColorMode } from '../../contexts/BackgroundContext';
import Participant from '../../store/model/participant';

const GoldCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#bdad31 !important',
    },
    '&$disabled': {
      color: 'lightgrey !important',
    },
  },
  checked: {
  },
  disabled: {
  },
})(Checkbox);

interface ParticipantExclusion {
    forOrderId: number;
    orderId: number;
    isChecked: boolean;
}

const ExclusionMatrix = () => {
  const { participants, editParticipant } = useContext(EventContext);
  const { setBackgroundMode } = useContext(BackgroundContext);
  const [exclusions, setExclusions] = useState<ParticipantExclusion[]>(
    participants.flatMap((p:Participant) => (
      participants.flatMap((pp:Participant) => ({
        forOrderId: p.orderId, orderId: pp.orderId, isChecked: p.excludedOrderIds.includes(pp.orderId),
      } as ParticipantExclusion)))),
  );

  useEffect(() => {
    setBackgroundMode(BackgroundColorMode.normal);
  }, []);

  useEffect(() => {
    setExclusions(
      participants.flatMap((p:Participant) => (
        participants.flatMap((pp:Participant) => ({
          forOrderId: p.orderId, orderId: pp.orderId, isChecked: p.excludedOrderIds.includes(pp.orderId),
        } as ParticipantExclusion)))),
    );
  }, [participants]);

  async function handleChange (forOrderId: number, orderId: number, checked: boolean) {
    const newExclusions = Array.from(exclusions);
    const found = newExclusions?.find((s) => s.forOrderId === forOrderId && s.orderId === orderId);
    if (found !== undefined) {
      found.isChecked = checked;
    }

    const toBeUpdated = participants.find((ppp) => ppp.orderId === forOrderId);
    if (toBeUpdated !== undefined) {
      toBeUpdated.excludedOrderIds = newExclusions.filter((pp) => pp.forOrderId === forOrderId && pp.isChecked).flatMap((s) => s.orderId);
      await editParticipant(toBeUpdated);
    }

    setExclusions(newExclusions);
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
            height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '74%' : '74%',
            paddingTop: '20px',
            paddingBottom: '0px',
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: '20px !important',
              height: 'auto',
            }}
          >
            <Table
              stickyHeader
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{
                    position: 'sticky',
                    left: 0,
                    background: 'white',
                    zIndex: 10,
                  }}
                  />
                  {participants.sort((a: Participant, b: Participant) => a.orderId - b.orderId).flatMap((p : Participant) => (
                    <TableCell
                      align="center"
                      style={{
                      }}
                    >
                      {p.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {participants?.map((p: Participant) => (
                  <TableRow
                    key={p.name}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        position: 'sticky',
                        left: 0,
                        background: 'white',
                        zIndex: 10,
                      }}
                    >
                      {p.name}

                    </TableCell>
                    {participants.sort((a: Participant, b: Participant) => a.orderId - b.orderId).flatMap((pp: Participant) => (
                      <TableCell align="center">
                        <Tooltip title="As a person from the left You can exclude a person from the top">
                          <GoldCheckbox
                            disabled={p.orderId === pp.orderId}
                            key={`${p.orderId}-${pp.orderId}`}
                            checked={exclusions?.find((s) => s.forOrderId === p.orderId && s.orderId === pp.orderId)?.isChecked}
                            onChange={(e: any, checked: boolean) => {
                              handleChange(p.orderId, pp.orderId, checked);
                            }}
                            inputProps={{
                              'aria-label': 'controlled',
                            }}
                          />
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

export default ExclusionMatrix;
