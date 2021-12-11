import React, { ReactNode } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentLayout from '../templates/ContentLayout';
import CenteredDiv from '../templates/CenteredDiv';
import { Wrapper } from './styles';

const LoadingInProgress = () => (
  <Wrapper>
    <ContentLayout>
      <CenteredDiv>
        <CircularProgress color="secondary" />
      </CenteredDiv>
    </ContentLayout>
  </Wrapper>
)

export default LoadingInProgress;
