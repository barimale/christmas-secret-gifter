import { useState, useEffect } from 'react';
import './App.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import { init } from 'emailjs-com';

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
