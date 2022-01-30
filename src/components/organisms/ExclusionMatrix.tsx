/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
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
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#bdad31 !important',
    },
    '&$disabled': {
      color: 'grey !important',
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
  const [exclusions, setExclusions] = useState<ParticipantExclusion[]>(
    participants.flatMap((p:Participant) => (
      participants.flatMap((pp:Participant) => ({
        forOrderId: p.orderId, orderId: pp.orderId, isChecked: p.excludedOrderIds.includes(pp.orderId),
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
      toBeUpdated.excludedOrderIds = newExclusions.filter((pp) => pp.forOrderId === forOrderId && pp.isChecked).flatMap((s) => s.orderId);
      await editParticipant(toBeUpdated);
    }

    setExclusions(newExclusions);
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
              {participants.sort((a: Participant, b: Participant) => a.orderId - b.orderId).flatMap((p : Participant) => (
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
                {participants.sort((a: Participant, b: Participant) => a.orderId - b.orderId).flatMap((pp: Participant) => (
                  <TableCell>
                    <Tooltip title="As a person from the left You can exclude a person from the top">
                      <GreenCheckbox
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
  );
};

export default ExclusionMatrix;
