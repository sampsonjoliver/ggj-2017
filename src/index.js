import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameController from './GameController';
import './index.css';

// start up phaser
var game = new GameController('phaser', 1920, 1080);

var reactApp = ReactDOM.render(
  <App game={game} />,
  document.getElementById('root')
);

game.react = reactApp;
