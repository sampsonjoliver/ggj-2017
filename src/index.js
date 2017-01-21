import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameController from './GameController';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// start up phaser
var phaser = new GameController('phaser', 800, 600);
