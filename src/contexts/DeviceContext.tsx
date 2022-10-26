/* eslint-disable no-unused-vars */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { isMobile, isBrowser, isTablet } from 'react-device-detect';

export enum DeviceType{
    isDesktopOrLaptop,
    isTabletOrMobile
}

const DeviceContext = React.createContext(DeviceType.isDesktopOrLaptop);

const DeviceContextConsumer = DeviceContext.Consumer;

const DeviceContextProvider = (props: any) => {
  const isLandscape = useMediaQuery({
    orientation: 'landscape',
  });

  const isDesktopOrLaptop = isBrowser;

  const isTabletOrMobileDevice = isMobile || (isTablet && isLandscape === false);

  function ObtainType (): DeviceType {
    if (isDesktopOrLaptop
        || (isTablet && isLandscape)) {
      return DeviceType.isDesktopOrLaptop;
    }

    if (isTabletOrMobileDevice) {
      return DeviceType.isTabletOrMobile;
    }

    return DeviceType.isDesktopOrLaptop;
  }

  return <DeviceContext.Provider value={ObtainType()}>{props.children}</DeviceContext.Provider>;
};

export {
  DeviceContextProvider, DeviceContextConsumer, DeviceContext,
};
