import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';

// eslint-disable-next-line no-undef
export function MyTextField(props: any): JSX.Element {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props.name);

  return (
    <DeviceContextConsumer>
      {() => (
        <TextField {...field} {...props} />
      )}
    </DeviceContextConsumer>
  );
}
