import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../components/templates/MainLayout';
import { DeviceContextProvider } from '../../contexts/DeviceContext';
import { EventContextProvider } from '../../contexts/EventContext';
import { LayoutContextProvider } from '../../contexts/LayoutContext';
import Routes from '../../router/Routes';

const ResourceLoadedApp = function () {
  return (
    <EventContextProvider>
      <DeviceContextProvider>
        <LayoutContextProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes />
            </MainLayout>
          </BrowserRouter>
        </LayoutContextProvider>
      </DeviceContextProvider>
    </EventContextProvider>
  );
};

export default ResourceLoadedApp;
