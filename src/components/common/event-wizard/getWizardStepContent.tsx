import React from 'react';
import { AddressDetails } from '../../../contexts/CartContext';
import { ParticipantsContent } from './steps/ParticipantsContent';
import { AddressStepContent } from './steps/AddressStepContent';
import { Redirect } from 'react-router-dom';
import { Path as HomePath } from '../../screens/MainScreen';
import { appBaseRouteKey } from "../../../router/routerConfiguration";
import SummaryContent from './steps/SummaryContent';
import { FormikProps } from 'formik';

export const getWizardStepContent = (stepIndex: number, handleNext: () => void, formikProps: FormikProps<AddressDetails>): JSX.Element => {
    switch (stepIndex) {
        case 0:
            return <ParticipantsContent />;
        case 1:
            return <AddressStepContent {...formikProps} />;
        case 2:
            return <SummaryContent handleNext={handleNext} />;
        default:
            return <Redirect to={appBaseRouteKey + HomePath} />;
    }
};
