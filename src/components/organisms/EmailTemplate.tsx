/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { Box, Fade } from '@material-ui/core';
import { ModalTitle } from '../molecules';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '32px',
    paddingTop: '0px',
    maxHeight: '80%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const EmailTemplate = (props: any) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div
      className={classes.modal}
      style={{
        boxShadow: `${theme.shadows[2]}`,
      }}
    >
      <Box
        boxShadow={10}
        style={{
          height: 'auto',
          width: '40%',
        }}
      >
        <Fade
          in
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'stretch',
          }}
          >
            <ModalTitle title="Gifted Participant" />
            <AddForm
              {...props}
            />
          </div>
        </Fade>
      </Box>
    </div>
  );
};

const AddForm = (props: any) => {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: '32px',
        paddingTop: '0px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: `${theme.palette.common.white}`,
        borderLeft: `20px solid ${theme.palette.primary.main}`,
      }}
    >
      <p>
        {props.name}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: `20px solid ${theme.palette.primary.main}`,
            width: '125px',
            borderRadius: '0px',
            marginTop: '20px',
            fontSize: '16px',
            color: 'white',
          }}
          // onClick={}
        >
          Start looking for a Gift right now...
        </button>
      </div>
    </div>
  );
};
