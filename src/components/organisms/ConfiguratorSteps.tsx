import React, { lazy } from 'react';

const DefineParticipantsLazy = lazy(() => import('../organisms/DefineParticipants'));
const ExclusionMatrixLazy = lazy(() => import('../organisms/ExclusionMatrix'));
const MatchParticipantsLazy = lazy(() => import('../organisms/MatchParticipants'));
const NotifyParticipantsLazy = lazy(() => import('../organisms/NotifyParticipants'));

export const ConfiguratorSteps = [
  {
    label: 'Define Participants.Title',
    description: 'Define Participants.Description',
    component: <DefineParticipantsLazy />,
  },
  {
    label: 'Exclusions Matrix.Title',
    description: 'Exclusions Matrix.Description',
    component: <ExclusionMatrixLazy />,
  },
  {
    label: 'Matching Participants.Title',
    description: 'Matching Participants.Description',
    component: <MatchParticipantsLazy />,
  },
  {
    label: 'Notify Participants.Title',
    description: 'Notify Participants.Description',
    component: <NotifyParticipantsLazy />,
  },
];
