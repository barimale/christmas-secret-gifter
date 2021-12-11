import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ItemDetails } from '../components/common/BuyItems';

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

type Event = {
    items: Array<ItemDetails>;
    getAddressDetails: () => AddressDetails;
    orderStatus: string;
    setOrderStatus: (value: string) => void;
    clear: () => void;
    getParticipantsAmount: () => number;
    add: (item: ItemDetails) => void;
    remove: (item: ItemDetails) => void;
    decrementByOne: (item: ItemDetails) => void;
    isPhysicalItemIncluded: () => boolean;
    registerAddressDetails: (data: AddressDetails) => void;
    registerFreeEvent: () => void;
    registerManagedEvent: () => void;
};

const EventContext = React.createContext<Event>({} as Event);

const EVENT_KEY = "71dc692c-47e5-4966-9fdc-da0fd26dbe13";

const apiUrl = process.env.REACT_APP_SHOP_APP;

const EventContextProvider = (props: any) => {
    const [ defaultItems, setDefaultItems] = useState<Array<ItemDetails>>(new Array<ItemDetails>());
    const [ addressDetails, setAddressDetails] = useState<AddressDetails>({} as AddressDetails);
    const [ orderStatus, setOrderStatus ] = useState<string>("");

    useEffect(()=>{
      var cartContent = localStorage.getItem(EVENT_KEY);
      if(cartContent !== null){
        var result: Array<ItemDetails> = JSON.parse(cartContent);
        setDefaultItems(result);
      }
    }, []);

    // const register = async (isManaged: boolean) => {
    //   try{
    //     return await axios.post(
    //       `${apiUrl}/api/engine/analyze`, 
    //       {}, 
    //       {}).catch(async (thrown: any)=>{
    //           console.log('Request canceled', thrown.message);
    //       }).finally(async() => {
    //         localStorage.removeItem(TOKEN_KEY);
    //         await dispatch({ type: 'SIGN_OUT' });
    //       });
    //   }catch(e){
    //     console.log(e);
    //   }
    // }

    useEffect(()=>{
      localStorage.setItem(EVENT_KEY, JSON.stringify(defaultItems));
    }, [defaultItems]);

      const eventContext: Event = ({
        clear: () => {
          setDefaultItems(new Array<ItemDetails>());  
          setAddressDetails({} as AddressDetails);    
        },
        registerFreeEvent: async () => {

        },
        registerManagedEvent: async () => {

        },
        getParticipantsAmount: () => {
            return defaultItems.length;
          },
        add: (data: ItemDetails) => {
          var currentCart = Array.from<ItemDetails>(defaultItems);
          const result = currentCart.concat([data]);
          setDefaultItems(result);
        },
        remove: (data: ItemDetails) => {
            var current = Array.from<ItemDetails>(defaultItems);
            var hasToStay = current.filter((p: ItemDetails) => p.id !== data.id);
            setDefaultItems(hasToStay);     
        },
        decrementByOne: (data: ItemDetails) => {
          var current = Array.from<ItemDetails>(defaultItems);
          var hasToBeRemoved = current.findIndex((p: ItemDetails) => p.id === data.id);
          if(hasToBeRemoved > -1){
            current.splice(hasToBeRemoved, 1);
          }
          setDefaultItems(current);     
      },
        isPhysicalItemIncluded: () => {
          const result = defaultItems.findIndex((p: ItemDetails) => p.isPhysicalItem === true);
          return result > -1;
        },
        registerAddressDetails: (data: AddressDetails) => {
          setAddressDetails(data); 
        },
        setOrderStatus: (value: string) => {
          setOrderStatus(value);
        },
        getAddressDetails:() => {
          return addressDetails;
        },
        orderStatus: orderStatus,
        items: defaultItems
      });
  
    return <EventContext.Provider value={eventContext}>{props.children}</EventContext.Provider>;
  }

export { EventContextProvider, EventContext };