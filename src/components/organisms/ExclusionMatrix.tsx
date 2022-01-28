/* eslint-disable max-len */
import React, { useContext, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';

interface ParticipantExclusion {
    forOrderId: number;
    orderId: number;
    isChecked: boolean;
}

const ExclusionMatrix = () => {
  const { participants, editParticipant } = useContext(EventContext);
  const [exclusions, setExclusions] = useState<ParticipantExclusion[]>(
    participants.flatMap((p:Participant) => (
      participants.flatMap((pp:Participant) => ({
        forOrderId: p.orderId, orderId: pp.orderId, isChecked: p.orderId === pp.orderId,
      } as ParticipantExclusion)))),
  );

  async function handleChange (forOrderId: number, orderId: number, checked: boolean) {
    const newExclusions = Array.from(exclusions);
    const found = newExclusions?.find((s) => s.forOrderId === forOrderId && s.orderId === orderId);
    if (found !== undefined) {
      found.isChecked = checked;
    }

    const toBeUpdated = participants.find((ppp) => ppp.orderId === forOrderId);
    if (toBeUpdated !== undefined) {
      toBeUpdated.excludedOrderIds = newExclusions.filter((pp) => pp.forOrderId === forOrderId).flatMap((s) => s.orderId);
      await editParticipant(toBeUpdated);
    }

    setExclusions(newExclusions);
  }

  return (
    <Paper sx={{
      width: '100%',
      overflow: 'hidden',
      height: '100%',
    }}
    >
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
              <TableCell align="left" />
              {participants.flatMap((p : Participant) => (
                <TableCell align="left">{p.name}</TableCell>
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
                <TableCell align="left">{p.name}</TableCell>
                {participants?.map((pp: Participant) => (
                  <TableCell>
                    <Checkbox
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
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExclusionMatrix;
