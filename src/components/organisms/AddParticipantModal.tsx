/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik'; // yupToFormErrors
import * as Yup from 'yup';

import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';
import { EmailField, ModalTitle, NameField } from '../molecules';
import Participant from '../../store/model/participant';

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

type AddParticipantModalProps = {
    isDisplayed: boolean;
    close: () => void;
}

export default function AddParticipantModal (props: AddParticipantModalProps) {
  return (
    <AddParticipantModalContent {...props} />
  );
}

const AddParticipantModalContent = (props: AddParticipantModalProps) => {
  const { isDisplayed, close } = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Modal
          className={classes.modal}
          open={isDisplayed}
          disableBackdropClick
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 1000,
          }}
          style={{
            boxShadow: `${theme.shadows[2]}`,
          }}
        >
          <Box
            boxShadow={10}
            style={{
              height: 'auto',
              width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40%' : '90%',
            }}
          >
            <Fade
              in={isDisplayed}
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
                <ModalTitle title="Register Participant" close={close} />
                <AddForm close={close} />
              </div>
            </Fade>
          </Box>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
};

type AddFormProps = {
    close: () => void;
}

const AddForm = (props: AddFormProps) => {
  const { close } = props;
  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const theme = useTheme();
  const {
    addParticipant,
    participants,
    checkEmailExistance,
    checkNameExistance,
  } = useContext(EventContext);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const theHighestIndex = participants.length > 0
    // eslint-disable-next-line prefer-spread
    ? Math.max.apply(Math, participants.map((o) => o.orderId))
    : 0;

  const [initialValues] = useState<Participant>({
    excludedOrderIds: [theHighestIndex + 1],
    id: '',
    orderId: theHighestIndex + 1,
    name: '',
    email: '',
  } as Participant);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  const onSubmit = async (value: Participant) => {
    try {
      setSendingInProgress(true);
      await addParticipant(value, source.token);
      close();
    } catch (thrown: any) {
      // eslint-disable-next-line no-console
      console.log('Request canceled', thrown.message);
    } finally {
      setSendingInProgress(false);
    }
  };

  const onCancel = () => {
    try {
      source.cancel();
    } finally {
      setSendingInProgress(false);
      close();
    }
  };

  const AddSchema = Yup.object().shape({
    name: Yup.string()
      .required('Field is required')
      .min(2, 'Field has to be at least 2 signs long')
      .max(50, 'Field cannot be longer than 50 signs')
      .test('checkNameUnique', 'Participant with the name is already registered.', (value) => checkNameExistance(value || '', source.token)),
    email: Yup.string()
      .email()
      .required('Field is required')
      .test('checkEmailUnique', 'Participant with the email is already registered.', (value) => checkEmailExistance(value || '', source.token)),
  });

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Formik
          initialValues={initialValues}
          validateOnMount={false}
          validateOnBlur
          validateOnChange
          enableReinitialize
          validationSchema={AddSchema}
          onSubmit={async (value: Participant) => {
            await onSubmit(value);
          }}
        >
          {(props: FormikProps<Participant>) => (
            <Form
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
              <>
                <AddFormContent
                  {...props}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    className="pointerOverEffect"
                    variant="contained"
                    color="secondary"
                    style={{
                      width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                      borderRadius: '0px',
                      marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                      color: 'white',
                    }}
                    onClick={() => {
                      onCancel();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={sendingInProgress}
                    className="pointerOverEffect"
                    variant="contained"
                    color="primary"
                    style={{
                      width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '125px' : '116px',
                      borderRadius: '0px',
                      marginTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '7px',
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                    }}
                    onClick={async () => {
                      await props.submitForm();
                    }}
                  >
                    {sendingInProgress === true && (
                      <CircularProgress
                        color="inherit"
                        style={{
                          height: '28px',
                          width: '28px',
                        }}
                      />
                    )}
                    {sendingInProgress === false && (
                      <>
                        Add
                      </>
                    )}
                  </Button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      )}
    </DeviceContextConsumer>
  );
};

const AddFormContent = (props: FormikProps<Participant>) => (
  <>
    <NameField {...props} />
    <EmailField {...props} />
  </>
);
