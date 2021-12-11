import React, { useState, useEffect } from 'react';
import './App.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import { init } from 'emailjs-com';
import { CustomMuiThemeProvider } from '../theme/CustomMuiThemeProvider';
import CenteredDiv from '../components/templates/CenteredDiv';
import ResourceLoadedApp from './resources-loaded/ResourceLoadedApp';

const App = function () {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init('user_GDgPHJRKg1GLbUltmYaW1');
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <CustomMuiThemeProvider>
        {isLoading ? (
          <CenteredDiv>
            <CircularProgress color="secondary" />
          </CenteredDiv>
        ) : (
          <ResourceLoadedApp />
        )}
      </CustomMuiThemeProvider>
    </div>
  );
};

export default App;
