import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { AddressDetails, CartContext } from '../../contexts/CartContext';
import StepperContainer from "../molecules/Stepper";
import { ParticipantsContent, Title as ParticipantsTitle } from "../common/cart-steps/ParticipantsContent";
import { AddressStepContent } from "../common/cart-steps/AddressStepContent";
import { Redirect } from 'react-router-dom';
import { Path as HomePath } from '../screens/CartScreen';
import { appBaseRouteKey} from "../../router/routerConfiguration";
import SummaryContent from '../common/cart-steps/SummaryContent';
import CenteredDiv from '../common/CenteredDiv';
import SuccessStepContent from "../common/cart-steps/SuccessStepContent";
import ErrorStepContent from "../common/cart-steps/ErrorStepContent";
import { ShortAddressSchema, LongAddressSchema} from "../common/cart-steps/AddressStepContent";
import { Formik, Form, FormikProps } from 'formik';
import { ContentLayout2 } from "../../components/layouts/MainLayout";

export const Path = "/";
export const Title = "Events"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: "Montserrat"
    },
  }),
);

function getSteps() {
  return [ParticipantsTitle, 'Waiting for preferences', 'Pairing'];
}

function getStepContent(stepIndex: number, handleNext: ()=> void, formikProps: FormikProps<AddressDetails>): JSX.Element {
    switch (stepIndex) {
      case 0:
        return <ParticipantsContent />;
      case 1:
        return <AddressStepContent {...formikProps} />;
      case 2:
        return <SummaryContent handleNext={handleNext}/>;
      default:
        return <Redirect to={appBaseRouteKey + HomePath} />;
    }
}

export function CartScreen(){
    const { getCount } = useContext(CartContext);
    const [ wizardInProgress ] = useState<boolean>(getCount() > 0);
    
    return(
      <CartWithItems />
        // getCount() > 0  || wizardInProgress? (
        //     <CartWithItems />
        // ):(
        //     <EmptyCart />
        // )
    );
}

function EmptyCart(){
    return(
        <DeviceContextConsumer>
            {context => 
                <div style={{
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    color: 'white',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    {"Brak produktów w Twoim koszyku".toUpperCase()}
                </div>
            }
        </DeviceContextConsumer>
    )
}

function CartWithItems(){
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [stepperHeight, setStepperHeight] = useState<number>(0);
  const { innerHeight: height } = window;
  const { isPhysicalItemIncluded, registerAddressDetails, orderStatus } = useContext(CartContext);
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
    {context => 
        <div className={classes.root}>
          <Formik
            style={{
              height: '100%',
              width: 'inherit',
              paddingBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
            }}
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={isPhysicalItemIncluded() ? LongAddressSchema : ShortAddressSchema}
            onSubmit={(value: AddressDetails)=>{
              registerAddressDetails(value);
              handleNext();
            }}>
              {props => (
            <Form>
              {!((activeStep === steps.length) && (orderStatus !== "success")) && (
                <StepperContainer
                activeStep={activeStep}
                steps={steps}
                onSize={(size: any)=>{
                  setStepperHeight(size.height || 0);
                }}/>
              )}
              {activeStep === steps.length ? (
                orderStatus === "success" ? (
                  <SuccessStepContent/>
                ):(
                  <ErrorStepContent/>
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
                    {activeStep !== steps.length - 1  && (
                    <Button
                      className={"pointerOverEffect"}
                      variant={"contained"}
                      color="primary"
                      onClick={()=>{
                        if(activeStep === 1){
                          props.submitForm();
                        }else{
                          handleNext();
                        }
                      }}>
                      {'NEXT'}
                    </Button>
                    )}
                  </div>
                  <CenteredDiv style={{
                    backgroundColor: 'white'}}>
                    {getStepContent(activeStep, handleNext, props)}
                  </CenteredDiv>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    }
    </DeviceContextConsumer>
  </ContentLayout2>
  );
}