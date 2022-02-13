import React, { useContext, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';
import EditParticipantModal from '../organisms/EditParticipantModal';
import { DeleteActionComponent } from './DeleteActionComponent';

interface Props{
    maxHeight: number;
}

const Participants = ({ maxHeight }: Props) => {
  const { participants, removeParticipant } = useContext(EventContext);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [toBeEdited, setToBeEdited] = useState<Participant | undefined>(undefined);

  useEffect(() => {
    if (!isEditVisible) {
      setToBeEdited(undefined);
    }
  }, [isEditVisible]);

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
              <TableCell align="left">ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell align="right">E-MAIL</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
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
                <TableCell align="left">{p.orderId}</TableCell>
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.email}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        setToBeEdited(p);
                        setIsEditVisible(true);
                      }}
                    />
                  </IconButton>
                  <DeleteActionComponent
                    disabled={false}
                    id={p.id || ''}
                    title="Are You sure?"
                    question="You are going to delete the participant. This operation cannot be restored."
                    yesLabel="Yes"
                    noLabel="No"
                    onAgreeAction={async () => {
                      await removeParticipant(p);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditParticipantModal
        participant={toBeEdited}
        isDisplayed={isEditVisible}
        close={() => {
          setIsEditVisible(false);
        }}
      />
    </Paper>
  );
};

export default Participants;
