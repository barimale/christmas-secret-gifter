/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';
import GiftEvent from '../store/model/gift-event';
import Participant from '../store/model/participant';

export interface AddressDetails {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  region: string;
  country: string;
  email: string;
  emailConfirmed: string;
}

export interface ItemDetails {
  id: string;
  active: boolean;
  price: number;
  categoryId: string;
}

type Cart = {
    items: Array<ItemDetails>;
    getAddressDetails: () => AddressDetails;
    orderStatus: string;
    setOrderStatus: (value: string) => void;
    clear: () => void;
    getCount: () => number;
    add: (item: ItemDetails) => void;
    remove: (item: ItemDetails) => void;
    decrementByOne: (item: ItemDetails) => void;
    isPhysicalItemIncluded: () => boolean;
    startEvent: () => Promise<GiftEvent | undefined>;
    giftEvent: GiftEvent | undefined;
    restartEvent: () => void;
    addParticipant: (participant: Participant) => void;
    participants: Participant[];
    source: CancelTokenSource;
};

const EventContext = React.createContext<Cart>({
} as Cart);

const CART_KEY = '8D61A160-53B4-40F1-A078-4DEEDC4E6CD7';

const EventContextProvider = (props: any) => {
  const [defaultItems, setDefaultItems] = useState<ItemDetails[]>([]);
  const [event, setEvent] = useState<GiftEvent | undefined>(undefined);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
  } as AddressDetails);
  const [orderStatus, setOrderStatus] = useState<string>('');

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => () => {
    source.cancel('Axios request cancelled');

    // return () => {
    //   source.cancel('Axios request cancelled');
    // };
  }, []);

  useEffect(() => {
    const cartContent = localStorage.getItem(CART_KEY);
    if (cartContent !== null) {
      const result: Array<ItemDetails> = JSON.parse(cartContent);
      setDefaultItems(result);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(defaultItems));
  }, [defaultItems]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const eventContext: Cart = ({
    clear: () => {
      setDefaultItems([]);
      setAddressDetails({
      } as AddressDetails);
    },
    source,
    getCount: () => defaultItems.length,
    add: (data: ItemDetails) => {
      const copied = Object.assign({
      } as ItemDetails, data);
      const currentCart = Array.from<ItemDetails>(defaultItems);
      const result = currentCart.concat([copied]);
      setDefaultItems(result);
    },
    remove: (data: ItemDetails) => {
      const current = Array.from<ItemDetails>(defaultItems);
      const hasToStay = current.filter((p: ItemDetails) => p.id !== data.id);
      setDefaultItems(hasToStay);
    },
    decrementByOne: (data: ItemDetails) => {
      const current = Array.from<ItemDetails>(defaultItems);
      const hasToBeRemoved = current.findIndex((p: ItemDetails) => p.id === data.id);
      if (hasToBeRemoved > -1) {
        current.splice(hasToBeRemoved, 1);
      }
      setDefaultItems(current);
    },
    isPhysicalItemIncluded: () => true,
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
    addParticipant: async (participant: Participant) => await axios.post(
      `http://localhost:5020/api/events/${event?.eventId}/participants/register`,
      participant,
    )
      .then(async (response: any) => {
        if (response.status === 200) {
          const result = await axios.post(`http://localhost:5020/api/events/${event?.eventId}/participants/all`);
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
      setEvent(undefined);
    },
    setOrderStatus: (value: string) => {
      setOrderStatus(value);
    },
    getAddressDetails: () => addressDetails,
    orderStatus,
    items: defaultItems,
  });

  return <EventContext.Provider value={eventContext}>{props.children}</EventContext.Provider>;
};

const EventContextConsumer = EventContext.Consumer;

export {
  EventContextProvider, EventContext, EventContextConsumer,
};
