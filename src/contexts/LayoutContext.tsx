/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

type LayoutSettings = {
  footerMarginBottom: number;
  // eslint-disable-next-line no-unused-vars
  setFooterMarginBottom: (value: number) => void;
}

const LayoutContext = React.createContext<LayoutSettings>({
} as LayoutSettings);

const LayoutContextConsumer = LayoutContext.Consumer;

const LayoutContextProvider = (props: any) => {
  // eslint-disable-next-line max-len
  const [footerMarginBottom, setFooterMarginBottom] = useState<number>(props.initialMarginBottom ?? 0);

  const initialContextValue: LayoutSettings = ({
    footerMarginBottom,
    setFooterMarginBottom: (value: number) => {
      setFooterMarginBottom(value);
    },
  });

  return (
    <LayoutContext.Provider
      value={initialContextValue}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};

export {
  LayoutContextProvider, LayoutContextConsumer, LayoutContext,
};
