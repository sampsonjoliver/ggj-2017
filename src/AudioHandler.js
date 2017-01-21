import Sound from 'phaser';

const currentTracks = {};

export default class AudioHandler {
  static getCurrentTracks() {
    return currentTracks;
  }

  static playTrack(track) {
    track.play();
  }

  static playLoopedTrack(track) {
    currentTracks[track.name] = true;
    track.loopFull();
  }

  static stopLoopedTrack(track) {
    currentTracks[track.name] = false;
    track.stop();
  }

  static crossfadeLoopedTracks(fromTrack, toTrack) {
    console.log(currentTracks);
    if (fromTrack === toTrack) {
      return;
    }

    fromTrack.fadeOut();
    toTrack.fadeIn(1000, true);
    currentTracks[fromTrack.name] = false
    currentTracks[toTrack.name] = true
  }
}
