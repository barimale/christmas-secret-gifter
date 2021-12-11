import React from 'react';
import './App.css';
import './AdditionalStyles.css';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfiguration';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { EventContextProvider } from './contexts/CartContext';
import CustomMuiThemeProvider from "./customTheme";
import Routes from "./router/Routes";
import { MainLayout } from './components/layouts/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';

function ResourceLoadedApp() {
  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <CustomMuiThemeProvider>
          <EventContextProvider>
            <DeviceContextProvider>
              <Router>
                <MainLayout>
                  <Routes/>
                </MainLayout>
              </Router>
            </DeviceContextProvider>
          </EventContextProvider>
        </CustomMuiThemeProvider>
      </FirebaseAuthProvider>
    </div>
  );
}

export default ResourceLoadedApp;