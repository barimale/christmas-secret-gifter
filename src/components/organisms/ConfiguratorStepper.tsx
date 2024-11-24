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
import { useTranslation } from 'react-i18next';
import { ConfiguratorSteps } from './ConfiguratorSteps';
import CenteredDiv from '../templates/CenteredDiv';
import { DeviceContextConsumer, DeviceType, EventContext, LayoutContextConsumer } from '../../contexts';
import { Theme } from '../../theme/custom-theme';
// import LanguageSetter from '../molecules/LanguageSetter';

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

export default function ConfiguratorStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ConfiguratorSteps;
  const maxSteps = steps.length;
  const { restartEvent, participants, analysisResult } = useContext(EventContext);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <LayoutContextConsumer>
          {(layoutContext) => (
            <Box
              sx={{
                maxWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? window.innerWidth * 0.5 : window.innerWidth * 0.8,
                // flexGrow: 1,
                backgroundColor: 'whitesmoke',
                zIndex: 1000,
                marginBottom: `${layoutContext.footerMarginBottom}px`,
              }}
              style={{
                scale: context.valueOf() === DeviceType.isDesktopOrLaptop ? '0.8' : '1',
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
                  paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
                  paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
                  justifyContent: 'space-between',
                  maxWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
                    ? window.innerWidth * 0.5 : window.innerWidth * 0.8,
                }}
              >
                <Typography style={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
                  paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                  color: 'whitesmoke',
                }}
                >
                  {t(steps[activeStep].label)}
                </Typography>
                {/* <LanguageSetter /> */}
              </Paper>
              <Box sx={{
                height: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? 440 : window.innerHeight * 0.60,
                minWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? window.innerWidth * 0.5 : window.innerWidth * 0.75,
                width: '100%', // WIP
                maxWidth: context.valueOf() === DeviceType.isDesktopOrLaptop
                  ? window.innerWidth * 0.5 : window.innerWidth * 0.8,
              }}
              >
                <div
                  style={{
                    paddingTop: context.valueOf() === DeviceType.isDesktopOrLaptop ? '10px' : '5px',
                    paddingLeft: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    paddingRight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    paddingBottom: context.valueOf() === DeviceType.isDesktopOrLaptop ? '15px' : '10px',
                    backgroundColor: `${Theme.palette.secondary.main}`,
                    fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop
                      ? '16px' : '10px',
                    textAlign: 'justify',
                    color: `${theme.palette.common.white}`,
                    lineHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? '1.5' : '1.3',
                    textShadow: '1px 1px black',
                  }}
                >
                  {t(steps[activeStep].description)}
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
                    style={{
                      visibility: activeStep === (maxSteps - 1) ? 'hidden' : 'visible',
                    }}
                    onClick={handleNext}
                    disabled={(activeStep === maxSteps - 1)
                      || (activeStep === 0 && participants.length < 2)
                      || (analysisResult && analysisResult.analysisStatus?.toLocaleLowerCase() === 'infeasible' && activeStep === 2)}
                  >
                    {t('Next')}
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
                    style={{
                      visibility: activeStep === 0 ? 'hidden' : 'visible',
                    }}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    {t('Back')}
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
                {t('Restart')}
              </GoldButton>
            </Box>
          )}
        </LayoutContextConsumer>
      )}
    </DeviceContextConsumer>
  );
}
