import React, { useContext, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
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
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight,
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
              <TableCell
                align="left"
                style={{
                }}
              >
                ID
              </TableCell>
              <TableCell style={{
              }}
              >
                NAME
              </TableCell>
              <TableCell
                align="right"
                style={{
                }}
              >
                E-MAIL
              </TableCell>
              <TableCell
                align="right"
                style={{
                }}
              >
                ACTIONS
              </TableCell>
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
                {/* component="th" put it below and fix */}
                <TableCell scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon
                        fontSize="small"
                        onClick={() => {
                          setToBeEdited(p);
                          setIsEditVisible(true);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
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
    </>
  );
};

export default Participants;
