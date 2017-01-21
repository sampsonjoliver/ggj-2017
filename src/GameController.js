import * as Phaser from 'phaser';
import * as Events from './Events.js';
import * as _ from 'lodash';
import AudioHandler from './AudioHandler';

import titleBgPath from '../public/assets/images/scene1_pass1_bg.png';
import titleCharPath from '../public/assets/images/scene1_pass1_character.png';
import titleWavesPath from '../public/assets/images/scene1_pass1_waves.png';

import ocean2Path from '../public/img/background2.jpg';

export default class GameController {
  static self;
  constructor(divId, width, height) {
    this.phaser = new Phaser.Game(width, height, Phaser.AUTO, divId, { preload: this.preload, create: this.create, update: this.update });
    this.width = width;
    this.height = height;
    GameController.self = this;
  }

  preload() {
    // 'this' is in the context of the new phaser game
    this.load.image('title.bg', titleBgPath);
    this.load.image('title.character', titleCharPath);
    this.load.image('title.waves', titleWavesPath);

    AudioHandler.preload(this);
  }

  create() {
    this.stage.disableVisibilityChange = true;

    this.stage.backgroundColor = '#000000';

    GameController.self.images = {};

    var bmd = new Phaser.BitmapData(this, 'overlay', 2200, 1200);
    bmd.fill(0,0,0,1);
    GameController.self.overlay = this.add.image(GameController.self.width/2, GameController.self.height/2, bmd);
    GameController.self.overlay.anchor.set(0.5, 0.5);

    this.camera.bounds = null;

    GameController.self.sequence(GameController.self.loadSequence('regret'));
  }

  update() {
    // nothing to do on update...
  }

  loadSequence(name) {
    return name ? require(`../public/assets/sequences/${name}.json`) : null;
  }

  enqueueSequence(sequence, enqueue) {
    enqueue = enqueue || this.loadSequence('exit');
    this.sequence(_.concat(enqueue, sequence));
  }

  checkRequires(event) {
    var requires = event.requires;
    if(!requires) return true;
    console.log(this);
    requires = requires.split(' ').map(require => {
      if(require.charAt(0) == '!')
        return !_.includes(this.react.state.links, require.substr(1));
      else
        return _.includes(this.react.state.links, require);
    });

    return _.every(requires, require => require);
  }

  sequence(sequence) {
    var timeout = 0;
    sequence = _.filter(sequence, this.checkRequires.bind(this));

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
          eventHandler(this, _.cloneDeep(event));
        }
      }, timeout * 1000);
    }
  }
}
