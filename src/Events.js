
export function addText(game, event) {
  game.react.addText(event);
}

export function removeAllText(game, event) {
  game.react.setState({ items: [] });
}

export function removeText(game, event) {
  game.react.removeText(event);
}

export function addLink(game, event) {
  game.react.addLink(event);
}

export function addLinks(game, event) {
  var timeout = 0;
  for(var i = 0; i < event.links.length; ++i) {
    const link = event.links[i];
    link.top = (i == 0) ? event.top : (event.links[i-1].top + 20);
    link.left = event.left;
    setTimeout(() => {
      game.react.addLink(link);
    }, timeout);
    timeout += 500;
  }
}

export function background(game, event) {
  game.image.loadTexture(event.background);
}

export function fadeOut(game, event) {
  game.phaser.add.tween(game.image).to( { alpha: 0 }, 1000).start();
}

export function fadeIn(game, event) {
  game.phaser.add.tween(game.image).to( { alpha: 1 }, 1000).start();
}
