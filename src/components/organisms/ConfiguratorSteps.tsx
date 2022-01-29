import React, { lazy } from 'react';

const DefineParticipantsLazy = lazy(() => import('../organisms/DefineParticipants'));
const ExclusionMatrixLazy = lazy(() => import('../organisms/ExclusionMatrix'));
const MatchParticipantsLazy = lazy(() => import('../organisms/MatchParticipants'));
const NotifyParticipantsLazy = lazy(() => import('../organisms/NotifyParticipants'));

export const ConfiguratorSteps = [
  {
    label: 'Define Participants',
    description: 'Hello Organizer - You already have Your event registered in the DB. Now, You need to provide some participants to the system - You need to define at least two of them to generate matching.',
    component: <DefineParticipantsLazy />,
  },
  {
    label: 'Exclusions Matrix',
    description: 'This step is optional. You can exclude some of participants in case You have no idea what to buy them. As it is the matrix-based representative of participants - some choices are blocked by default as You are not allowed to buy a gift for Yourself.',
    component: <ExclusionMatrixLazy />,
  },
  {
    label: 'Match Participants',
    description: 'Results of pairing are presented here. In case You made too many exclusions in the previous step You might have INFEASIBLE status here, which simply means, that some of participants will not get their gifts. You need to go back to the Exclusions Matrix step and correct data.',
    component: <MatchParticipantsLazy />,
  },
  {
    label: 'Notify Participants',
    description: 'Results of pairing are send to participants here. Each participant is informed about the person he/she has to buy a gift. Results are confidential. Only You - as an organizator of the event - have access to all of them. It is the last step - so Marry Christmas and Happy Shopping! :)',
    component: <NotifyParticipantsLazy />,
  },
];
