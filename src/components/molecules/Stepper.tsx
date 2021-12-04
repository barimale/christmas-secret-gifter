import sizeMe from 'react-sizeme';
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

type StepperContainerProps ={
    steps: Array<string>;
    activeStep: number;
}

const StepperContainer = (props: StepperContainerProps) => {
    const { steps, activeStep } = props;

return (
    <DeviceContextConsumer>
    {context => 
        <Stepper
            activeStep={activeStep} 
            alternativeLabel>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>
                  <div style={{
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px': '10px',
                    fontFamily: 'Montserrat'
                    }}>
                      {label}
                    </div>
                </StepLabel>
            </Step>
            ))}
        </Stepper>}
    </DeviceContextConsumer>
    );
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(StepperContainer);