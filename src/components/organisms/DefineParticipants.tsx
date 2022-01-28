import React, { useContext } from 'react';
import { EventContext } from '../../contexts';
import { ParticipantsGrid } from '../molecules';

const DefineParticipants = () => {
  const { giftEvent } = useContext(EventContext);

  return (
    giftEvent ? (
      <ParticipantsGrid title={giftEvent.eventId ?? undefined} />
    ) : (
      <p>Something went wrong...</p>
    )
  );
};

export default DefineParticipants;
