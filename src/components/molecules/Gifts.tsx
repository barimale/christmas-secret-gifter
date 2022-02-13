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
      color: 'whitesmoke',
      gap: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'stretch',
      alignItems: 'center',
      fontSize: '30px',
    }}
    >
      <p style={{
        color: 'gold',
        fontFamily: 'inherit',
        margin: '0px',
        padding: '0px',
        height: 'fit-content',
      }}
      >
        D
      </p>
      <p style={{
        color: 'red',
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
        fontFamily: 'inherit', margin: '0px', padding: '0px', height: 'fit-content', color: 'green',
      }}
      >
        D
      </p>
    </div>
  </div>
);
