import React from 'react';
import ReactDOM from 'react-dom';
import GameStore from './reducer';
import App from './components/App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <GameStore>
      <App />
    </GameStore>
  </React.StrictMode>,
  rootElement
);
