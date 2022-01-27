/* eslint-disable arrow-body-style */
import React, { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';
import { Button, Grid, IconButton, Paper } from '@material-ui/core';
import CenteredDiv from '../templates/CenteredDiv';
import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';

export const Path = '/';
export const Title = 'Events';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontFamily: 'Lora',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const MainScreen = function () {
  const { startEvent, giftEvent } = useContext(EventContext);

  return (
    <CenteredDiv>
      {!giftEvent && (
      <Button
        variant="outlined"
        onClick={async () => {
          await startEvent();
        }}
        style={{
          fontSize: '40px',
          backgroundColor: 'grey',
          boxShadow: `${customTheme.shadows[10]}`,
          textShadow: '1px 1px white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <p>START</p>
        </div>
      </Button>
      )}
      {giftEvent && (
        <DefineParticipants />
      )}
    </CenteredDiv>
  );
};

const DefineParticipants = () => {
  const { giftEvent, restartEvent } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <>
      {giftEvent ? (
        <ParticipantsGrid title={giftEvent.eventId ?? undefined} />
      ) : (
        <p>Something went wrong...</p>
      )}
      <Button
        variant="outlined"
        disabled={isInProgress}
        onClick={async () => {
          setIsInProgress(true);
          restartEvent();
          setIsInProgress(false);
        }}
        style={{
          fontSize: '10px',
          backgroundColor: 'grey',
          boxShadow: `${customTheme.shadows[10]}`,
          textShadow: '1px 1px white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <p>RESTART</p>
        </div>
      </Button>
    </>
  );
};

interface ParticipantsGridProps{
  title?: string;
}

const ParticipantsGrid = (props: ParticipantsGridProps) => {
  const { title } = props;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'whitesmoke',
      padding: '20px',
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
      }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
        >
          <span>Add Participants To List</span>
          <span>{title}</span>
        </div>
        <IconButton
          className="pointerOverEffect"
        >
          <AddIcon style={{
            borderRadius: '0px',
          }}
          />
        </IconButton>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </div>
  );
};
