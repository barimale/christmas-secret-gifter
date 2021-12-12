import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/fonts/Sacramento-Regular/Sacramento-Regular.ttf';
import './assets/fonts/Lora/Lora-Italic-VariableFont_wght.ttf';
import './assets/fonts/Lora/Lora-VariableFont_wght.ttf';
import './assets/fonts/Lora/static/Lora-Bold.ttf';
import './assets/fonts/Lora/static/Lora-BoldItalic.ttf';
import './assets/fonts/Lora/static/Lora-Italic.ttf';
import './assets/fonts/Lora/static/Lora-Medium.ttf';
import './assets/fonts/Lora/static/Lora-MediumItalic.ttf';
import './assets/fonts/Lora/static/Lora-Regular.ttf';
import './assets/fonts/Lora/static/Lora-SemiBold.ttf';
import './assets/fonts/Lora/static/Lora-SemiBoldItalic.ttf';
import { Helmet } from 'react-helmet';
import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Helmet>
        <title>Christmas Secret Gifter</title>
        <meta
          name="description"
          content="Organize an event, invite family members, ask for their preferences and match them as everyone has its dreamy gift."
        />
      </Helmet>
      <App />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
