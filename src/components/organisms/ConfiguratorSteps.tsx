import React, { lazy } from 'react';

const DefineParticipantsLazy = lazy(() => import('../organisms/DefineParticipants'));
const ExclusionMatrixLazy = lazy(() => import('../organisms/ExclusionMatrix'));
const MatchParticipantsLazy = lazy(() => import('../organisms/MatchParticipants'));

export const ConfiguratorSteps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    component: <DefineParticipantsLazy />,
  },
  {
    label: 'Create an ad group',
    description: 'An ad group contains one or more ads which target a shared set of keywords.',
    component: <ExclusionMatrixLazy />,
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    component: <MatchParticipantsLazy />,
  },
];
