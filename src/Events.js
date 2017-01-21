import * as _ from 'lodash';
import AudioHandler from './AudioHandler';
import * as Phaser from 'phaser';

const screenWidth = 1920;
const screenHeight = 1080;

export function addText(game, event) {
  event.top *= game.height;
  event.left *= game.width;
  //event.text = event.text.replace('\n', '<br/>')
  game.react.addText(event);
}

export function addTexts(game, event) {
  var timeout = 0;
  console.log(game.react.state.links);
  var texts = _.filter(event.texts, text => !_.includes(game.react.state.links, text.target));
  for(var i = 0; i < texts.length; ++i) {
    const text = texts[i];
    text.top = i == 0 ? event.top * game.height : texts[i-1].top + 40;
    text.left = event.left * game.width;
    setTimeout(() => {
      game.react.addText(text);
    }, timeout);
    timeout += 500;
  }
}

export function removeAllText(game, event) {
  game.react.setState({ texts: [] });
}

export function removeText(game, event) {
  game.react.removeText(event);
}

export function addImage(game, event) {
  var x = typeof event.x === 'number' ? event.x * game.width : game.width/2;
  var y = typeof event.y === 'number' ? event.y * game.height : game.height/2;
  var image = game.phaser.add.image(x, y, event.image);
  image.anchor.set(0.5, 0.5);
  image.scale.set(0.9, 0.9);
  if(event.parallax) {
    game.phaser.add.tween(image).to({ x: x + event.parallax }, 5000).to({ x: x }, 5000).loop(true).start();
  }
  game.images[event.image] = image;
  game.overlay.bringToTop();
}

export function removeAllImages(game, event) {
  _.forOwn(game.images, image => image.destroy());
  game.images = {};
}

export function cameraPan(game, event) {
  game.phaser.camera.x = event.x;
  game.phaser.camera.y = event.y;

  game.phaser.add.tween(game.phaser.camera).to({ x: 0, y: 0}, 2500, Phaser.Easing.Circle).start();
}

export function removeImage(game, event) {
  var image = game.images[event.image];
  if(image) {
    image.destroy();
    game.images[event.image] = null;
  }
}

export function fadeOut(game, event) {
  game.phaser.add.tween(game.overlay).to( { alpha: 1 }, 1000).start();
}

export function fadeIn(game, event) {
  game.phaser.add.tween(game.overlay).to( { alpha: 0 }, 1000).start();
}

export function startAudio(game, event) {
  console.log(AudioHandler.Tracks[event.track]);
  let track = AudioHandler.getCurrentTracks()[event.track].obj;
  if (!track) {
    track = game.phaser.add.audio(event.track);
  }

  AudioHandler.startLoopedTrack(track);
}

export function stopAudio(game, event) {
  var track = AudioHandler.getCurrentTracks()[event.track];
  if (track.isPlaying) {
    AudioHandler.stopLoopedTrack(track.obj);
  }
}

export function crossfadeAudio(game, event) {
  var prevTrack = AudioHandler.getCurrentTracks()[event.prevTrack].obj;
  if (!prevTrack) {
    prevTrack = game.phaser.add.audio(event.prevTrack);
  }
  var nextTrack = AudioHandler.getCurrentTracks()[event.nextTrack].obj;
  if (!nextTrack) {
    nextTrack = game.phaser.add.audio(event.nextTrack);
  }

  AudioHandler.crossfadeLoopedTracks(prevTrack, nextTrack);

}
