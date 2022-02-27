import React, { lazy } from 'react';

const DefineParticipantsLazy = lazy(() => import('../organisms/DefineParticipants'));
const ExclusionMatrixLazy = lazy(() => import('../organisms/ExclusionMatrix'));
const MatchParticipantsLazy = lazy(() => import('../organisms/MatchParticipants'));
const NotifyParticipantsLazy = lazy(() => import('../organisms/NotifyParticipants'));

export const ConfiguratorSteps = [
  {
    label: 'Define Participants',
    description: 'Hello Organizer - You already have Your event registered in the DB. Now, You need to define at least two of participants to generate matching.',
    component: <DefineParticipantsLazy />,
  },
  {
    label: 'Exclusions Matrix',
    description: 'This step is OPTIONAL only. You can exclude some of participants in case You know They do not know each other. As it is the matrix-based representative of participants - some choices are blocked by default as You are not allowed to buy a gift for Yourself.',
    component: <ExclusionMatrixLazy />,
  },
  {
    label: 'Matching Participants',
    description: 'Results of pairing are presented here. You may get INFEASIBLE status, which means in practice, that some of participants will not be gifted.',
    component: <MatchParticipantsLazy />,
  },
  {
    label: 'Notify Participants',
    description: 'Results of pairing are send to participants via email. Only You - as an Organizator of the event - have access to all of them.',
    component: <NotifyParticipantsLazy />,
  },
];
