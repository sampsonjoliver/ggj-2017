import Sound from 'phaser';
import background1 from '../public/audio/background1.mp3';
import background2 from '../public/audio/background2.mp3';

const currentTracks = {};

export default class AudioHandler {
  static Tracks = {
    'background1': background1,
    'background2': background2
  }

  static getCurrentTracks() {
    return currentTracks;
  }

  static preload(game) {
    for (var key in AudioHandler.Tracks) {
      if(!AudioHandler.Tracks.hasOwnProperty(key)) continue;
      console.log("Loading track: " + key + " with file: " + AudioHandler.Tracks[key])
      game.load.audio(key, AudioHandler.Tracks[key]);
      currentTracks[key] = {
        isPlaying: false
      }
    }
  }

  static playTrack(track) {
    track.play();
  }

  static startLoopedTrack(track) {
    currentTracks[track.name] = {
      obj: track,
      isPlaying: true
    };
    track.loopFull();
  }

  static stopLoopedTrack(track) {
    currentTracks[track.name] = {
      obj: track,
      isPlaying: false
    };
    console.log(track);
    track.stop();
  }

  static crossfadeLoopedTracks(fromTrack, toTrack) {
    console.log(currentTracks);
    if (fromTrack === toTrack) {
      return;
    }

    fromTrack.fadeOut();
    toTrack.fadeIn(1000, true);

    currentTracks[fromTrack.name] = {
      obj: fromTrack,
      isPlaying: false
    };

    currentTracks[toTrack.name] = {
      obj: toTrack,
      isPlaying: false
    };
  }
}
