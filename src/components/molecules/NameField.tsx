import React from 'react';
import { FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import { DeviceContextConsumer } from '../../contexts';
import { MyTextField } from '../atoms';
import Participant from '../../store/model/participant';

const defaultXs = 12;
const defaultSm = 12;

export const NameField = (props: FormikProps<Participant>) => (
  <DeviceContextConsumer>
    {() => (
      <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="name"
          name="name"
          label="Name"
          autoComplete="given-name"
          margin="dense"
          error={Boolean(props.touched.name && props.errors.name)}
          helperText={props.touched.name && props.errors.name}
          fullWidth
        />
      </Grid>
    )}
  </DeviceContextConsumer>
);
