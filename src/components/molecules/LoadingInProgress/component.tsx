import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Wrapper } from './styles';
import ContentLayout from '../../templates/ContentLayout';
import CenteredDiv from '../../templates/CenteredDiv';

const LoadingInProgress = () => (
  <Wrapper>
    <ContentLayout>
      <CenteredDiv>
        <CircularProgress color="secondary" />
      </CenteredDiv>
    </ContentLayout>
  </Wrapper>
);

export default LoadingInProgress;
