import React, { useState, useEffect } from 'react';
import './App.css';
import './Snow.css';

import { I18nextProvider } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { init } from 'emailjs-com';
import i18n from './i18n';
import { CustomMuiThemeProvider } from '../theme/CustomMuiThemeProvider';
import CenteredDiv from '../components/templates/CenteredDiv';
import ResourceLoadedApp from './resources-loaded/ResourceLoadedApp';
import { BackgroundContextProvider } from '../contexts/BackgroundContext';

const App = function () {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init('user_GDgPHJRKg1GLbUltmYaW1');
    if (i18n.isInitialized === false) {
      i18n.init();
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <CustomMuiThemeProvider>
        <BackgroundContextProvider>
          {isLoading ? (
            <CenteredDiv>
              <CircularProgress color="secondary" />
            </CenteredDiv>
          ) : (
            <I18nextProvider i18n={i18n}>
              <ResourceLoadedApp />
            </I18nextProvider>
          )}
        </BackgroundContextProvider>
      </CustomMuiThemeProvider>
    </div>
  );
};

export default App;
