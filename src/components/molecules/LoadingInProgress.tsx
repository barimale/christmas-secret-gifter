import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentLayout from '../templates/ContentLayout';
import CenteredDiv from '../templates/CenteredDiv';

const LoadingInProgress = function () {
  return (
    <ContentLayout>
      <CenteredDiv>
        <CircularProgress color="secondary" />
      </CenteredDiv>
    </ContentLayout>
  );
};

export default LoadingInProgress;
