import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';
import EditParticipantModal from '../organisms/EditParticipantModal';

interface Props{
    maxHeight: number;
}

export const Participants = ({ maxHeight }: Props) => {
  const { participants, removeParticipant } = useContext(EventContext);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

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
          maxHeight,
        }}
      >
        <Table
          stickyHeader
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.email}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        setIsEditVisible(true);
                      }}
                    />
                  </IconButton>
                  <IconButton onClick={async () => {
                    await removeParticipant(p);
                  }}
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </IconButton>
                  <EditParticipantModal
                    participant={p}
                    isDisplayed={isEditVisible}
                    close={() => {
                      setIsEditVisible(false);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
