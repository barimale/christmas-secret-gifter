import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; import Participant from '../../store/model/participant';
import { EventContext } from '../../contexts/EventContext';
import { NotifyParticipantRow } from '../molecules/NotifyParticipantRow';

const NotifyParticipants = () => {
  const { participants } = useContext(EventContext);

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
          // maxHeight,
        }}
      >
        <Table
          stickyHeader
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants?.map((p: Participant) => (
              <NotifyParticipantRow participant={p} captcha="" />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NotifyParticipants;
