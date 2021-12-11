import React from 'react';

const CenteredDiv = function (props: any) {
  const backgroundColor: string = (props.style && props.style.backgroundColor) ?? 'unset';
  const verticalAlign: string = (props.style && props.style.verticalAlign) ?? 'center';

  return (
    <div
      {...props}
      style={{
        backgroundColor,
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
