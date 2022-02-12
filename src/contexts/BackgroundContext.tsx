/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

// eslint-disable-next-line no-shadow
export enum BackgroundColorMode{
    // eslint-disable-next-line no-unused-vars
    normal,
    // eslint-disable-next-line no-unused-vars
    error
}

type BackgroundManager = {
  backgroundColorMode: BackgroundColorMode;
  // eslint-disable-next-line no-unused-vars
  setBackgroundMode: (mode: BackgroundColorMode) => void;
}

const BackgroundContext = React.createContext<BackgroundManager>({
} as BackgroundManager);

const BackgroundContextConsumer = BackgroundContext.Consumer;

const BackgroundContextProvider = (props: any) => {
  const [background, setBackground] = useState<BackgroundColorMode>(BackgroundColorMode.normal);

  const backgroundContextValue: BackgroundManager = ({
    backgroundColorMode: background,
    setBackgroundMode: (mode: BackgroundColorMode) => {
      setBackground(mode);
    },
  });

  return (
    <BackgroundContext.Provider
      value={backgroundContextValue}
    >
      {props.children}
    </BackgroundContext.Provider>
  );
};

export {
  BackgroundContextProvider, BackgroundContextConsumer, BackgroundContext,
};
