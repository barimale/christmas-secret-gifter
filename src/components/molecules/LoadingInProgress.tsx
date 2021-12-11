import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from "../layouts/CenteredDiv";
import { ContentLayout } from "../layouts/ContentLayout";

export const LoadingInProgress = () =>{
    return(
        <ContentLayout>
            <CenteredDiv>
                    <CircularProgress color="secondary" />
            </CenteredDiv>
        </ContentLayout>
    );
}