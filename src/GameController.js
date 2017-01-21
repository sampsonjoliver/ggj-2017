import * as Phaser from 'phaser';
import AudioHandler from './AudioHandler';

import oceanPath from '../public/img/background.jpg';
import ocean2Path from '../public/img/background2.jpg';

export default class GameController {
  constructor(divId: string, width: number, height: number) {
    this.phaser = new Phaser.Game(width, height, Phaser.AUTO, divId, { preload: this.preload, create: this.create, update: this.update });
  }

  preload() {
    // 'this' is in the context of the new phaser game
    this.load.image('ocean', oceanPath);
    this.load.image('ocean2', ocean2Path);
  }

  create() {
    this.stage.disableVisibilityChange = true;

    this.stage.backgroundColor = '#000000';

    this.image = this.add.image(0, 0, 'ocean');

    this.image.inputEnabled = true;
    this.image.events.onInputDown.add(GameController.transition.bind(this, 'ocean2'));

    this.image.alpha = 0;

    this.add.tween(this.image).to( { alpha: 1 }, 2000).start();
  }

  update() {
    // nothing to do on update...
  }

  static sequence(newBackground) {
    var fadeOut = this.add.tween(this.image).to( { alpha: 0 }, 1000);
    fadeOut.onComplete.add(() => this.image.loadTexture(newBackground));
    var fadeIn = this.add.tween(this.image).delay(500).to( { alpha: 1 }, 2000);
    fadeOut.chain(fadeIn);

    fadeOut.start();
  }
}
