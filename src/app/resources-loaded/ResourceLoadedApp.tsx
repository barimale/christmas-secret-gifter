import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '../../components/templates/MainLayout';
import { EventContextProvider } from '../../contexts/CartContext';
import { DeviceContextProvider } from '../../contexts/DeviceContext';
import Routes from '../../router/Routes';

function ResourceLoadedApp() {
  return (
    <EventContextProvider>
      <DeviceContextProvider>
        <Router>
          <MainLayout>
            <Routes/>
          </MainLayout>
        </Router>
      </DeviceContextProvider>
    </EventContextProvider>
  );
}

export default ResourceLoadedApp;