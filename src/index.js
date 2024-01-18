import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SessionClock from './session-clock';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <body>
      <div id='title'>Session Clock</div>
      <SessionClock />  
      <div id='lui'>Session clock made by Luighy      
          <audio id="beep" preload="auto" src={"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"}>
          </audio>
      </div>
    </body>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
