import * as Phaser from 'phaser';
import * as Events from './Events.js';
import * as _ from 'lodash';
import AudioHandler from './AudioHandler';

import oceanPath from '../public/img/background.jpg';
import ocean2Path from '../public/img/background2.jpg';

export default class GameController {
  static self;
  constructor(divId, width, height) {
    this.phaser = new Phaser.Game(width, height, Phaser.AUTO, divId, { preload: this.preload, create: this.create, update: this.update });
    GameController.self = this;
  }

  preload() {
    // 'this' is in the context of the new phaser game
    this.load.image('ocean', oceanPath);
    this.load.image('ocean2', ocean2Path);

    AudioHandler.preload(this);
  }

  create() {
    this.stage.disableVisibilityChange = true;

    this.stage.backgroundColor = '#000000';

    GameController.self.image = this.add.image(0, 0, 'ocean');

    GameController.self.image.alpha = 0;

    GameController.self.sequence(GameController.self.loadSequence('title'));
  }

  update() {
    // nothing to do on update...
  }

  loadSequence(name) {
    return require(`../public/assets/sequences/${name}`);
  }

  enqueueSequence(sequence) {
    var exit = this.loadSequence('exit');
    this.sequence(_.concat(exit, sequence));
  }

  sequence(sequence) {
    var timeout = 0;
    for(var i = 0; i < sequence.length; ++i) {
      const event = sequence[i];
      // handle timing
      var time = typeof event.time === 'number' ? event.time : 1;
      timeout += time;
      // schedule event to run
      setTimeout(() => {
        console.log(event);
        var eventHandler = Events[event.type];
        if(eventHandler) {
          eventHandler(this, event);
        }
      }, timeout * 1000);
    }
  }
}
