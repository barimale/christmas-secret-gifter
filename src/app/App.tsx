import './App.css';

import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import{ init } from 'emailjs-com';
import { useEffect } from 'react';
import CenteredDiv from '../components/templates/CenteredDiv';
import ResourceLoadedApp from './resources-loaded/ResourceLoadedApp';
import CustomMuiThemeProvider from '../styles/customTheme';

function App() {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  
  useEffect(()=>{
    init("user_GDgPHJRKg1GLbUltmYaW1");
    setIsLoading(false);
  },[]);
  
  return (
    <div className="App">
      <CustomMuiThemeProvider>
      {isLoading ? (
          <CenteredDiv>
            <CircularProgress color="secondary" />
          </CenteredDiv>
        ):(
          <ResourceLoadedApp/>
        )}
      </CustomMuiThemeProvider>
    </div>
  );
}

export default App;