import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import { Item } from '../atoms';
import { EventContext } from '../../contexts';
import Participant from '../../store/model/participant';

interface ParticipantsGridProps {
  title?: string;
}

export const ParticipantsGrid = (props: ParticipantsGridProps) => {
  const { title } = props;
  const { participants } = useContext(EventContext);

  return (
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
        >
          <AddIcon />
        </IconButton>
      </div>
      {participants.length > 0 ? (
        <Grid container spacing={2}>
          {participants.flatMap((p: Participant) => (
            <Grid item xs={8}>
              <Item>{p.name}</Item>
              <Item>{p.email}</Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          No participants defined yet.
        </Typography>
      )}
    </div>
  );
};
