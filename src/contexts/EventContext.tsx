/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios, { CancelToken } from 'axios';
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
    startEvent: (cancellationToken?
        : CancelToken) => Promise<GiftEvent | undefined>;
    restartEvent: (cancellationToken?
        : CancelToken) => void;
    addParticipant: (participant: Participant, cancellationToken?
      : CancelToken) => void;
    removeParticipant: (participant: Participant, cancellationToken?
      : CancelToken) => void;
    editParticipant: (participant: Participant, cancellationToken?
      : CancelToken) => void;
    analyze: (cancellationToken?
        : CancelToken) => Promise<AlgorithmResponse | undefined>;
    cleanUp: () => void;
    giftEvent: GiftEvent | undefined;
    analysisResult: AlgorithmResponse | undefined;
    participants: Participant[];
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
    const found = participants[index];
    if (found !== undefined) {
      return found.name;
    }
    return undefined;
  }

  function getEmail (index: number): string | undefined | null {
    const found = participants[index];
    if (found !== undefined) {
      return found.email;
    }
    return undefined;
  }

  function getParticipantId (index: number): string | undefined | null {
    const found = participants[index];
    if (found !== undefined) {
      return found.id;
    }
    return undefined;
  }

  function MapToMailDetails (): ToGifterParams[] {
    const details = analysisResult?.pairs.flatMap((p: Pair) => {
      const detail = {
        participantId: getParticipantId(p.fromIndex),
        from_name: getEmail(p.fromIndex),
        to_name: getName(p.toIndex),
        title: 'Christmas Secret Gifter - pairing results!',
        forName: getName(p.toIndex),
        reply_to: '',
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
    startEvent: async (cancellationToken?
    // eslint-disable-next-line no-return-await
      : CancelToken) => await axios.post(`${backendUrl}/api/events/create`, {
    }, {
      cancelToken: cancellationToken,
      headers: {
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
    analyze: async (cancellationToken?
    // eslint-disable-next-line no-return-await
        : CancelToken) => await axios.post(`${backendUrl}/api/events/${event?.id}/execute`, {
    }, {
      cancelToken: cancellationToken,
      headers: {
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
    cleanUp: () => {
      setEvent(undefined);
    },
    addParticipant: async (participant: Participant, cancellationToken?
    // eslint-disable-next-line no-return-await
        : CancelToken) => await axios.post(
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
        cancelToken: cancellationToken,
        headers: {
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: cancellationToken,
              headers: {
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
    editParticipant: async (participant: Participant, cancellationToken?
    // eslint-disable-next-line no-return-await
        : CancelToken) => await axios.put(
      `${backendUrl}/api/events/${event?.id}/participants/${participant.id}`,
      participant,
      {
        cancelToken: cancellationToken,
        headers: {
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: cancellationToken,
              headers: {
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
    removeParticipant: async (participant: Participant, cancellationToken?
    // eslint-disable-next-line no-return-await
        : CancelToken) => await axios.delete(
      `${backendUrl}/api/events/${event?.id}/participants/${participant.id}`,
      {
        cancelToken: cancellationToken,
        headers: {
        },
      },
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.get(
            `${backendUrl}/api/events/${event?.id}/participants/all`,
            {
              cancelToken: cancellationToken,
              headers: {
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
