import * as Phaser from 'phaser';
import * as Events from './Events.js';
import * as _ from 'lodash';
import AudioHandler from './AudioHandler';

import titleBgPath from '../public/assets/images/scene1_pass1_bg.png';
import titleCharPath from '../public/assets/images/scene1_pass1_character.png';
import titleWavesPath from '../public/assets/images/scene1_pass1_waves.png';

import wtfBgPath from '../public/assets/images/scene2_pass1_bg.png';
import wtfBg2Path from '../public/assets/images/scene2_pass1_bg2.png';
import wtfCharPath from '../public/assets/images/scene2_pass1_characters.png';
import wtfDebrisPath from '../public/assets/images/scene2_pass1_debris.png';

import regretCharPath from '../public/assets/images/scene3_pass1_characters.png';
import regretBgPath from '../public/assets/images/scene3_pass1_bg.png';
import regretBg2Path from '../public/assets/images/scene3_pass1_bg2.png';

import changeBg from '../public/assets/images/scene5.png';
import finalBg from '../public/assets/images/scene6.png';

import ocean2Path from '../public/img/background2.jpg';

const DEBUG_FAST = true;

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

    this.load.image('wtf.character', wtfCharPath);
    this.load.image('wtf.bg', wtfBgPath);
    this.load.image('wtf.bg2', wtfBg2Path);
    this.load.image('wtf.debris', wtfDebrisPath);

    this.load.image('regret.character', regretCharPath);
    this.load.image('regret.bg', regretBgPath);
    this.load.image('regret.bg2', regretBg2Path);

    this.load.image('change.bg', changeBg);
    this.load.image('final.bg', finalBg);

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

  enqueueSequence(sequence, enqueue, links) {
    enqueue = enqueue || this.loadSequence('exit');
    this.sequence(_.concat(enqueue, sequence), links);
  }

  checkRequires(event, links) {
    var requires = event.requires;
    if(!requires) return true;
    requires = requires.split(' ').map(require => {
      if(require.charAt(0) == '!')
        return !_.includes(links, require.substr(1));
      else
        return _.includes(links, require);
    });

    return _.every(requires, require => require);
  }

  sequence(sequence, links) {
    var timeout = 0;
    sequence = _.filter(sequence, item => this.checkRequires(item, links));

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
      }, timeout * (DEBUG_FAST ? 100 : 1000));
    }
  }
}
