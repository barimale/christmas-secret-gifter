import React, { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Item } from '../atoms';
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';
import AddParticipantModal from '../organisms/AddParticipantModal';
import EditParticipantModal from '../organisms/EditParticipantModal';

interface ParticipantsGridProps {
  title?: string;
}

export const ParticipantsGrid = (props: ParticipantsGridProps) => {
  const { title } = props;
  const { participants, removeParticipant } = useContext(EventContext);
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        padding: '20px',
        paddingTop: '0px',
      }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid lightgrey',
        }}
        >
          <Tooltip title={title ?? ''}>
            <IconButton>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <span>Add Participants To List</span>
          <IconButton
            className="pointerOverEffect"
            style={{
              borderRadius: '0px',
            }}
            onClick={() => {
              setIsAddVisible(true);
            }}
          >
            <p>{isAddVisible}</p>
            <AddIcon />
          </IconButton>
        </div>
        {participants.length > 0 ? (
          <Grid container spacing={2}>
            {participants.flatMap((p: Participant) => (
              <Grid item xs={8}>
                <Item>
                  <div style={{
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  >
                    <span>Name:</span>
                    {p.name}
                    <span>Email:</span>
                    {p.email}
                    <span>Exclusions:</span>
                    {p.excludedOrderIds}
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
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography style={{
            padding: '20px',
          }}
          >
            No participants defined yet.
          </Typography>
        )}
      </div>
      <AddParticipantModal
        isDisplayed={isAddVisible}
        close={() => {
          setIsAddVisible(false);
        }}
      />
    </>
  );
};
