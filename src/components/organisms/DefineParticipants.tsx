import React, { useContext } from 'react';
import { EventContext } from '../../contexts';
import ParticipantsGrid from '../molecules/ParticipantsGrid';

const DefineParticipants = () => {
  const { giftEvent } = useContext(EventContext);

  return (
    giftEvent ? (
      <ParticipantsGrid />
    ) : (
      <p>Something went wrong...</p>
    )
  );
};

export default DefineParticipants;
