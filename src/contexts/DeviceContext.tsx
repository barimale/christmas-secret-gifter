import React from 'react';
import { useMediaQuery } from 'react-responsive';

// eslint-disable-next-line no-shadow
export enum DeviceType{
    // eslint-disable-next-line no-unused-vars
    isDesktopOrLaptop,
    // eslint-disable-next-line no-unused-vars
    isTabletOrMobile
}

const { Provider, Consumer } = React.createContext(DeviceType.isDesktopOrLaptop);

const DeviceContextProvider = (props: any) => {
  const isLandscape = useMediaQuery({
    orientation: 'landscape',
  });
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1024,
  });
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1023,
  });
  const isSmallMobileDevice = useMediaQuery({
    maxDeviceWidth: 400,
  });

  function ObtainType (): DeviceType {
    if (isDesktopOrLaptop
        || (isTabletOrMobileDevice && isLandscape && (isSmallMobileDevice === false))) {
      return DeviceType.isDesktopOrLaptop;
    }

    if (isTabletOrMobileDevice) {
      return DeviceType.isTabletOrMobile;
    }

    return DeviceType.isDesktopOrLaptop;
  }

  return <Provider value={ObtainType()}>{props.children}</Provider>;
};

export { DeviceContextProvider, Consumer as DeviceContextConsumer };
