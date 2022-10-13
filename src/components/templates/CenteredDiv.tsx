import React from 'react';

const CenteredDiv = function (props: any) {
  const backgroundColor: string = (props.style && props.style.backgroundColor) ?? 'unset';
  const verticalAlign: string = (props.style && props.style.verticalAlign) ?? 'center';
  const position: string = (props.style && props.style.position) ?? 'unset';

  return (
    <div
      {...props}
      style={{
        backgroundColor,
        position,
        display: 'flex',
        justifyContent: 'space-around',
        verticalAlign,
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  );
};

export default CenteredDiv;
