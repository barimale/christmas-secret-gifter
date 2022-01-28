import React, { lazy } from 'react';

const DefineParticipantsLazy = lazy(() => import('../organisms/DefineParticipants'));
const ExclusionMatrixLazy = lazy(() => import('../organisms/ExclusionMatrix'));
const MatchParticipantsLazy = lazy(() => import('../organisms/MatchParticipants'));

export const ConfiguratorSteps = [
  {
    label: 'Add Participants To List',
    description: 'Description',
    component: <DefineParticipantsLazy />,
  },
  {
    label: 'Exclusions Matrix',
    description: 'Description',
    component: <ExclusionMatrixLazy />,
  },
  {
    label: 'Match Participants',
    description: 'Description',
    component: <MatchParticipantsLazy />,
  },
];
