import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../components/templates/MainLayout';
import { DeviceContextProvider } from '../../contexts/DeviceContext';
import Routes from '../../router/Routes';

const ResourceLoadedApp = function () {
  return (
  // <EventContextProvider>
    <DeviceContextProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes />
        </MainLayout>
      </BrowserRouter>
    </DeviceContextProvider>
  // </EventContextProvider>
  );
};

export default ResourceLoadedApp;
