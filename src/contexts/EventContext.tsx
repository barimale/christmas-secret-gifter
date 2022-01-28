/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { Guid } from 'guid-typescript';
import GiftEvent from '../store/model/gift-event';
import Participant from '../store/model/participant';
import AlgorithmResponse from '../store/model/algorithm-response';

type EventManager = {
    startEvent: () => Promise<GiftEvent | undefined>;
    giftEvent: GiftEvent | undefined;
    restartEvent: () => void;
    addParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    removeParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    editParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    participants: Participant[];
    analyze: () => Promise<AlgorithmResponse | undefined>;
};

const EventContext = React.createContext<EventManager>({
} as EventManager);

const EventContextProvider = (props: any) => {
  const [event, setEvent] = useState<GiftEvent | undefined>(undefined);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const eventContext: EventManager = ({
    // eslint-disable-next-line no-return-await
    startEvent: async () => await axios.post('http://localhost:5020/api/events/create')
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          setEvent(data ?? undefined);
        }

        return Promise.resolve(event);
      })
      .catch(() => {
        setEvent(undefined);
        return Promise.reject(event);
      }),
    // eslint-disable-next-line no-return-await
    analyze: async () => await axios.post(`http://localhost:5020/api/events/${event?.id}/execute`)
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          const mapped = data as AlgorithmResponse;
          return Promise.resolve(mapped);
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(undefined);
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch(() => Promise.reject(undefined)),
    addParticipant: async (participant: Participant, source?
    // eslint-disable-next-line no-return-await
      : CancelTokenSource) => await axios.post(
      `http://localhost:5020/api/events/${event?.id}/participants/register`,
      {
        name: participant.name,
        email: participant.email,
        orderId: participant.orderId,
        eventId: event?.id,
        id: Guid.create().toString(),
        excludedOrderIds: participant.excludedOrderIds,
      },
      {
        cancelToken: source?.token,
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `http://localhost:5020/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
            },
          );
          if (result.status === 200) {
            const { data } = result;

            setParticipants(data);
          }

          return Promise.resolve(participants);
        }
        return Promise.reject(participants);
      })
      .catch(() => Promise.reject(participants)),
    editParticipant: async (participant: Participant, source?
    // eslint-disable-next-line no-return-await
          : CancelTokenSource) => await axios.put(
      `http://localhost:5020/api/events/${event?.id}/participants/${participant.id}`,
      participant,
      {
        cancelToken: source?.token,
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `http://localhost:5020/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
            },
          );
          if (result.status === 200) {
            const { data } = result;

            setParticipants(data);
          }

          return Promise.resolve(participants);
        }
        return Promise.reject(participants);
      })
      .catch(() => Promise.reject(participants)),
    removeParticipant: async (participant: Participant, source?
    // eslint-disable-next-line no-return-await
          : CancelTokenSource) => await axios.delete(
      `http://localhost:5020/api/events/${event?.id}/participants/${participant.id}`,
      {
        cancelToken: source?.token,
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `http://localhost:5020/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
            },
          );
          if (result.status === 200) {
            const { data } = result;

            setParticipants(data);
          }

          return Promise.resolve(participants);
        }
        return Promise.reject(participants);
      })
      .catch(() => Promise.reject(participants)),
    giftEvent: event,
    participants,
    restartEvent: () => {
      setParticipants([]);
      setEvent(undefined);
    },
  });

  return <EventContext.Provider value={eventContext}>{props.children}</EventContext.Provider>;
};

const EventContextConsumer = EventContext.Consumer;

export {
  EventContextProvider, EventContext, EventContextConsumer,
};
