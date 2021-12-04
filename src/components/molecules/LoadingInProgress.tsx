import React from "react";
import { CenteredDiv } from "../common/divs";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContentLayout } from "../layouts/MainLayout";

export const LoadingInProgress = () =>{
    return(
        <ContentLayout>
            <CenteredDiv>
                    <CircularProgress color="secondary" />
            </CenteredDiv>
        </ContentLayout>
    );
}