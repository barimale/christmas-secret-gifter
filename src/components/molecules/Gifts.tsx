import * as React from 'react';

interface GiftsProps {
  style: React.CSSProperties;
}

export const Gifts = (props: GiftsProps) => (
  <div style={props.style}>
    <div style={{
      width: 'auto',
      height: 'auto',
      fontFamily: 'kgChristmasTrees',
      color: 'red',
      gap: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'stretch',
      alignItems: 'center',
      fontSize: '30px',
    }}
    >
      <p style={{
        color: 'green',
        fontFamily: 'inherit',
        margin: '0px',
        padding: '0px',
        height: 'fit-content',
      }}
      >
        D
      </p>
      <p style={{
        color: 'purple',
        fontFamily: 'inherit',
        margin: '0px',
        padding: '0px',
        height: 'fit-content',
      }}
      >
        D
      </p>
      <p style={{
        color: 'blue',
        fontFamily: 'inherit',
        margin: '0px',
        padding: '0px',
        height: 'fit-content',
      }}
      >
        D
      </p>
      <p style={{
        color: 'white',
        fontFamily: 'inherit',
        margin: '0px',
        padding: '0px',
        height: 'fit-content',
      }}
      >
        D
      </p>
      <p style={{
        fontFamily: 'inherit', margin: '0px', padding: '0px', height: 'fit-content',
      }}
      >
        D
      </p>
    </div>
  </div>
);
