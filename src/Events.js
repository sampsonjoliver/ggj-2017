import * as _ from 'lodash';

const screenWidth = 1920;
const screenHeight = 1080;

export function addText(game, event) {
  event.top *= game.height;
  event.left *= game.width;
  event.text = event.text.replace('\n', )
  game.react.addText(event);
}

export function addTexts(game, event) {
  var timeout = 0;
  for(var i = 0; i < event.texts.length; ++i) {
    const text = event.texts[i];
    text.top = i == 0 ? event.top * game.height : event.texts[i-1].top + 40;
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
