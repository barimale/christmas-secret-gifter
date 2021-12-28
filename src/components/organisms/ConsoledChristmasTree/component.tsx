import React, { useRef } from 'react';
import xmasTree from 'xmas-tree';
import Console from 'react-console-component';
import { Wrapper } from './styles';

const ConsoledChristmasTree = () => {
  const ref = useRef(null);

  function PrintTree () {
    // eslint-disable-next-line no-console
    console.log('begin');

    if (ref.current) {
      const node = ref.current;
      if (node !== undefined && node !== null) {
        const consoledComponent = node as Console;
        consoledComponent.log(xmasTree());
        // eslint-disable-next-line no-console
        console.log('in');
      }
    }
  }

  return (
    <Wrapper>
      <Console
        ref={ref}
        handler={() => PrintTree()}
        autofocus
      />
    </Wrapper>
  );
};

export default ConsoledChristmasTree;
