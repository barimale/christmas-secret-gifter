import React from 'react';

const ContentLayout = function (props: any) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: 'inherit',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      backgroundColor: 'white',
    }}
    >
      {props.children}
    </div>
  );
};

export default ContentLayout;
