import React from 'react';
import { FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import { DeviceContextConsumer, DeviceType } from '../../contexts';
import { MyTextField } from '../atoms';
import Participant from '../../store/model/participant';

const defaultXs = 12;
const defaultSm = 6;

export const EmailField = (props: FormikProps<Participant>) => (
  <DeviceContextConsumer>
    {(context) => (
      <Grid item xs={defaultXs} sm={defaultSm}>
        <MyTextField
          id="email"
          name="email"
          label="E-mail"
          autoComplete="email"
          margin="dense"
          SelectProps={{
            native: context.valueOf() !== DeviceType.isDesktopOrLaptop,
          }}
          helperText={props.touched.email && props.errors.email}
          error={Boolean(props.touched.email && props.errors.email)}
          fullWidth
        />
      </Grid>
    )}
  </DeviceContextConsumer>
);
