import React, { useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import useHover from '../../../hooks/useHover';
import useTouched from '../../../hooks/useTouched';
import { EventContext } from '../../../contexts/CartContext';

export function StartEvent() {
  return (
    <DeviceContextConsumer>
      {context => 
        <div style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          color: 'white',
          gap: '40px',
          height: 'auto',
          fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '20px'
        }}>
          <CreateFreeEvent />
          <CreateManagedEvent />
        </div>}
    </DeviceContextConsumer>
  );
}

const CreateManagedEvent = () => {
  const ref = useRef(null);
  const isHover = useHover(ref);
  const isTouched = useTouched(ref);
  const { registerManagedEvent } = useContext(EventContext);

  return(
    <Button 
      ref={ref} 
      style={{
        color: 'inherit', 
        backgroundColor: 'black',
        padding: '40px',
        fontSize: 'inherit',
        height: 'auto',
        opacity: isHover || isTouched ? '0.65' : '1'
      }}
      onClick={async () =>{
          await registerManagedEvent();
      }}>
      {"Create event by Yourself".toUpperCase()}   
    </Button>
  );
}

const CreateFreeEvent = () => {
  const ref = useRef(null);
  const isHover = useHover(ref);
  const isTouched = useTouched(ref);
  const { registerFreeEvent } = useContext(EventContext);

  return(
    <Button 
      ref={ref} 
      style={{
        color: 'inherit', 
        backgroundColor: 'black',
        padding: '40px',
        fontSize: 'inherit',
        opacity: isHover || isTouched ? '0.65' : '1'
      }}
      onClick={async () =>{
          await registerFreeEvent();
      }}>
      {"Create event together".toUpperCase()}   
    </Button>
  );
}