import React, { lazy, Suspense } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from '../templates/CenteredDiv';

const ContactScreenContent = lazy(() => import('../pages/ContactScreenContent'));

export const ContactPath = '/contact';
export const ContactTitle = 'Contact';

export function ContactScreen () {
  return (
    <Suspense fallback={(
      <CenteredDiv>
        <CircularProgress color="secondary" />
      </CenteredDiv>
          )}
    >
      <ContactScreenContent />
    </Suspense>
  );
}
