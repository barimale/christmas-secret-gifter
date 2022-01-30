/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { Guid } from 'guid-typescript';
import GiftEvent from '../store/model/gift-event';
import Participant from '../store/model/participant';
import AlgorithmResponse from '../store/model/algorithm-response';
import { ToGifterParams } from '../hooks/useEmailClient';
import Pair from '../store/model/pair';

export interface MailStatus extends ToGifterParams{
  status: 'success' | 'error'
}

type EventManager = {
    startEvent: () => Promise<GiftEvent | undefined>;
    giftEvent: GiftEvent | undefined;
    restartEvent: () => void;
    addParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    removeParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    editParticipant: (participant: Participant, source?: CancelTokenSource) => void;
    participants: Participant[];
    analyze: () => Promise<AlgorithmResponse | undefined>;
    analysisResult: AlgorithmResponse | undefined;
    sendMailDetails: ToGifterParams[];
};

const EventContext = React.createContext<EventManager>({
} as EventManager);

const backendUrl = process.env.REACT_APP_BACKEND;

const EventContextProvider = (props: any) => {
  const [event, setEvent] = useState<GiftEvent | undefined>(undefined);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AlgorithmResponse | undefined>(undefined);
  const [sendMailDetails, setSendMailDetails] = useState<ToGifterParams[]>([]);

  function getName (index: number): string | undefined | null {
    const found = participants.find((p) => p.orderId === index);
    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  function getParticipantId (index: number): string | undefined | null {
    const found = participants.find((p) => p.orderId === index);
    if (found !== undefined) {
      return found.id;
    }
    return undefined;
  }

  function MapToMailDetails (): ToGifterParams[] {
    const details = analysisResult?.pairs.flatMap((p: Pair) => {
      const detail = {
        participantId: getParticipantId(p.fromIndex),
        from_name: 'mateusz.wolnica@gmail.com',
        to_name: getName(p.fromIndex),
        title: 'Christmas Secret Gifter - pairing results!',
        forName: getName(p.toIndex),
        reply_to: 'mateusz.wolnica@gmail.com',
        gRecaptchaResponse: '',
      } as ToGifterParams;
      return detail;
    });

    return details ?? [] as ToGifterParams[];
  }

  useEffect(() => {
    if (participants.length > 0 && analysisResult !== undefined && !analysisResult.isError) {
      const result = MapToMailDetails();
      setSendMailDetails(result);
    }
  }, [participants, analysisResult]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const eventContext: EventManager = ({
    // eslint-disable-next-line no-return-await
    startEvent: async () => await axios.post(`${backendUrl}/api/events/create`, {
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
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
    analyze: async () => await axios.post(`${backendUrl}/api/events/${event?.id}/execute`, {
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          const mapped = data as AlgorithmResponse;
          setAnalysisResult(mapped);
          return Promise.resolve(mapped);
        }

        setAnalysisResult(undefined);
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(undefined);
      })
      .catch(() => {
        setAnalysisResult(undefined);
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(undefined);
      }),
    analysisResult,
    sendMailDetails,
    addParticipant: async (participant: Participant, source?
    // eslint-disable-next-line no-return-await
      : CancelTokenSource) => await axios.post(
      `${backendUrl}/api/events/${event?.id}/participants/register`,
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
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
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
      `${backendUrl}/api/events/${event?.id}/participants/${participant.id}`,
      participant,
      {
        cancelToken: source?.token,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
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
      `${backendUrl}/api/events/${event?.id}/participants/${participant.id}`,
      {
        cancelToken: source?.token,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: source?.token,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
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
