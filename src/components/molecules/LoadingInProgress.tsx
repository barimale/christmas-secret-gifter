import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from "../templates/CenteredDiv";
import { ContentLayout } from "../templates/ContentLayout";

export const LoadingInProgress = () =>{
    return(
        <ContentLayout>
            <CenteredDiv>
                    <CircularProgress color="secondary" />
            </CenteredDiv>
        </ContentLayout>
    );
}