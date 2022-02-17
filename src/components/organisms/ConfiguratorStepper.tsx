/* eslint-disable new-cap */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Suspense, useContext, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { ConfiguratorSteps } from './ConfiguratorSteps';
import CenteredDiv from '../templates/CenteredDiv';
import { DeviceContextConsumer, DeviceType, EventContext } from '../../contexts';

const GoldButton = withStyles({
  root: {
    color: '#bdad31 !important',
    '&$disabled': {
      color: 'lightgrey !important',
    },
  },
  disabled: {
  },
})(Button);

export default function ConfiguratorStepper () {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ConfiguratorSteps;
  const maxSteps = steps.length;
  const { restartEvent, participants } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Box sx={{
          maxWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
            ? 800 : window.innerWidth * 0.8,
          flexGrow: 1,
          backgroundColor: 'whitesmoke',
          zIndex: 1000,
        }}
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              bgcolor: 'black',
              color: 'white',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={{
              fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
              paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
              color: 'whitesmoke',
            }}
            >
              {steps[activeStep].label}
            </Typography>
          </Paper>
          <Box sx={{
            height: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? 440 : window.innerHeight * 0.60,
            minWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
              ? 600 : window.innerWidth * 0.75,
            width: '100%',
          }}
          >
            <div
              style={{
                paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '10px' : '5px',
                paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                paddingRight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ? '15px' : '10px',
                backgroundColor: '#28b829',
                fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? '16px' : '10px',
                textAlign: 'justify',
                color: `${theme.palette.common.white}`,
                lineHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '1.5' : '1.3',
              }}
            >
              {steps[activeStep].description}
            </div>
            <Suspense fallback={(
              <CenteredDiv>
                <CircularProgress color="secondary" />
              </CenteredDiv>
          )}
            >
              {steps[activeStep].component}
            </Suspense>
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={(
              <GoldButton
                className="pointerOverEffect"
                size="small"
                onClick={handleNext}
                disabled={(activeStep === maxSteps - 1)
                || (activeStep === 0 && participants.length < 2)}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </GoldButton>
        )}
            backButton={(
              <GoldButton
                className="pointerOverEffect"
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </GoldButton>
        )}
          />
          <GoldButton
            className="pointerOverEffect"
            size="small"
            disabled={isInProgress}
            style={{
              padding: '12px',
            }}
            onClick={async () => {
              setIsInProgress(true);
              restartEvent();
              setIsInProgress(false);
            }}
          >
            Restart
          </GoldButton>
        </Box>
      )}
    </DeviceContextConsumer>
  );
}
