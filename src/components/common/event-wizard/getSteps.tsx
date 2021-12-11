import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { AddressDetails, EventContext } from '../../../contexts/CartContext';
import StepperContainer from "../../molecules/Stepper";
import CenteredDiv from '../CenteredDiv';
import SuccessStepContent from "./steps/SuccessStepContent";
import ErrorStepContent from "./steps/ErrorStepContent";
import { ShortAddressSchema, LongAddressSchema } from "./steps/AddressStepContent";
import { Formik, Form } from 'formik';
import { ContentLayout2 } from "../../layouts/MainLayout";
import { useStyles } from '../../screens/MainScreen';
import { getWizardStepContent } from './getWizardStepContent';
import { getWizardStepTitles } from './getWizardSteps';

export const EventWizard = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getWizardStepTitles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [stepperHeight, setStepperHeight] = useState<number>(0);
  const { innerHeight: height } = window;
  const { isPhysicalItemIncluded, registerAddressDetails, orderStatus } = useContext(EventContext);
  
  const initialValues: AddressDetails = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    region: "",
    country: "",
    email: "",
    emailConfirmed: ""
  };

  return (
    <ContentLayout2>
      <DeviceContextConsumer>
        {context => <div className={classes.root}>
          <Formik
            style={{
              height: '100%',
              width: 'inherit',
              paddingBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
            }}
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={isPhysicalItemIncluded() ? LongAddressSchema : ShortAddressSchema}
            onSubmit={(value: AddressDetails) => {
              registerAddressDetails(value);
              handleNext();
            }}>
            {props => (
              <Form>
                {!((activeStep === steps.length) && (orderStatus !== "success")) && (
                  <StepperContainer
                    activeStep={activeStep}
                    steps={steps}
                    onSize={(size: any) => {
                      setStepperHeight(size.height || 0);
                    }} />
                )}
                {activeStep === steps.length ? (
                  orderStatus === "success" ? (
                    <SuccessStepContent />
                  ) : (
                    <ErrorStepContent />
                  )
                ) : (
                  <div style={{
                    paddingLeft: context === DeviceType.isDesktopOrLaptop ? '10%' : '10px',
                    paddingRight: context === DeviceType.isDesktopOrLaptop ? '10%' : '10px',
                    paddingBottom: '32px'
                  }}>
                    <div style={{
                      display: 'flex',
                      paddingBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                      paddingTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'inherit'
                    }}>
                      <Button
                        className={"pointerOverEffect"}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="text"
                        color="primary">
                        {'BACK'}
                      </Button>
                      {activeStep !== steps.length - 1 && (
                        <Button
                          className={"pointerOverEffect"}
                          variant={"contained"}
                          color="primary"
                          onClick={() => {
                            if (activeStep === 1) {
                              props.submitForm();
                            } else {
                              handleNext();
                            }
                          }}>
                          {'NEXT'}
                        </Button>
                      )}
                    </div>
                    <CenteredDiv style={{
                      backgroundColor: 'white'
                    }}>
                      {getWizardStepContent(activeStep, handleNext, props)}
                    </CenteredDiv>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>}
      </DeviceContextConsumer>
    </ContentLayout2>
  );
}
