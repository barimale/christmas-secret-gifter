import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Sacramento-Regular.ttf'
import {Helmet} from 'react-helmet';

ReactDOM.render(
  <React.StrictMode>
    <>
    <Helmet>
      <title>Christmas Secret Gifter</title>
      <meta 
        name="description"
        content="Organize an event, invite family members, ask for their preferences and match them as everyone has its dreamy gift." />
    </Helmet>
    <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
