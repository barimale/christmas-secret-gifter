import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '../../components/templates/MainLayout';
import { DeviceContextProvider } from '../../contexts/DeviceContext';
import Routes from '../../router/Routes';

const ResourceLoadedApp = function () {
  return (
  // <EventContextProvider>
    <DeviceContextProvider>
      <Router>
        <MainLayout>
          <Routes />
        </MainLayout>
      </Router>
    </DeviceContextProvider>
  // </EventContextProvider>
  );
};

export default ResourceLoadedApp;
