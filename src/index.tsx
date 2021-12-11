import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/fonts/Sacramento-Regular.ttf'
import {Helmet} from 'react-helmet';
import App from './app/App';

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
