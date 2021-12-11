import React from 'react';
import { lazy, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from '../templates/CenteredDiv';

const ContactScreenContent = lazy(() => import("../pages/ContactScreenContent"));

export const Path = "/contact";
export const Title = "Contact";

export function ContactScreen(){
    return (
        <Suspense fallback={
            <CenteredDiv>
                <CircularProgress color="secondary" />
            </CenteredDiv>
        }>
            <ContactScreenContent/>
        </Suspense>
    );
}