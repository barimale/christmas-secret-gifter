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
import { ConfiguratorSteps } from './ConfiguratorSteps';
import CenteredDiv from '../templates/CenteredDiv';

import { Theme as customTheme } from '../../theme/custom-theme';
import { EventContext } from '../../contexts';

export default function ConfiguratorStepper () {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ConfiguratorSteps;
  const maxSteps = steps.length;
  const { restartEvent } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{
      maxWidth: 400, flexGrow: 1,
    }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{
        height: 255, maxWidth: 400, width: '100%',
      }}
      >
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
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        )}
      />
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
          <p>Restart</p>
        </div>
      </Button>
    </Box>
  );
}
