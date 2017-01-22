import * as Phaser from 'phaser';
import * as Events from './Events.js';
import * as _ from 'lodash';
import AudioHandler from './AudioHandler';

import titleBgPath from '../public/assets/images/title.bg.png';
import titleCharPath from '../public/assets/images/title.character.png';
import titleWavesPath from '../public/assets/images/title.waves.png';

import wtfBgPath from '../public/assets/images/wtf.bg.1.png';
import wtfBg2Path from '../public/assets/images/wtf.bg.2.png';
import wtfFishPath from '../public/assets/images/wtf.fish.png';

import fearBgPath from '../public/assets/images/fear.bg.1.png';
import fearBg2Path from '../public/assets/images/fear.bg.2.png';
import fearCharPath from '../public/assets/images/fear.character.png';
import fearCharPostkillPath from '../public/assets/images/fear.character.postkill.png';
import fearDebrisPath from '../public/assets/images/fear.debris.png';

import regretCharPath from '../public/assets/images/regret.character.png';
import regretCharPostkillPath from '../public/assets/images/regret.character.postkill.png';
import regretBgPath from '../public/assets/images/regret.bg.1.png';
import regretBg2Path from '../public/assets/images/regret.bg.2.png';

import bottlePath from '../public/assets/images/bottle.png';
import bottleSmallPath from '../public/assets/images/bottle.small.png';
import bottleBgPath from '../public/assets/images/bottle.bg.1.png';
import bottleBg2Path from '../public/assets/images/bottle.bg.2.png';

import maniaPath from '../public/assets/images/mania.png';
import maniaPostkillPath from '../public/assets/images/mania.postkill.png';

import changeBg from '../public/assets/images/scene5.png';
import finalBg from '../public/assets/images/scene6.png';
import logo from '../public/assets/images/mariana_logo.png';

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

    this.load.image('wtf.fish', wtfFishPath);
    this.load.image('wtf.bg.1', wtfBgPath);
    this.load.image('wtf.bg.2', wtfBg2Path);

    this.load.image('fear.character', fearCharPath);
    this.load.image('fear.character.postkill', fearCharPostkillPath);
    this.load.image('fear.bg.1', fearBgPath);
    this.load.image('fear.bg.2', fearBg2Path);
    this.load.image('fear.debris', fearDebrisPath);

    this.load.image('regret.character', regretCharPath);
    this.load.image('regret.character.postkill', regretCharPostkillPath);
    this.load.image('regret.bg.1', regretBgPath);
    this.load.image('regret.bg.2', regretBg2Path);

    this.load.image('bottle', bottlePath);
    this.load.image('bottle.small', bottleSmallPath);
    this.load.image('bottle.bg.1', bottleBgPath);
    this.load.image('bottle.bg.2', bottleBg2Path);

    this.load.image('mania', maniaPath);
    this.load.image('mania.postkill', maniaPostkillPath);

    this.load.image('change.bg', changeBg);
    this.load.image('final.bg', finalBg);

    this.load.image('logo', logo);

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

    GameController.self.sequence(GameController.self.loadSequence('mania'));
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
