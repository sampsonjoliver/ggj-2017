import Sound from 'phaser';

import titleTheme from '../public/assets/audio/mariana_theme.mp3';
import drone1 from '../public/assets/audio/mariana_1_1.mp3';
import drone2 from '../public/assets/audio/mariana_2_1.mp3';
import drone3 from '../public/assets/audio/mariana_3_1.mp3';
import drone4 from '../public/assets/audio/mariana_4_1.mp3';

const currentTracks = {

};

export default class AudioHandler {
  static Tracks = {
    "title": titleTheme,
    "drone1": drone1,
    "drone2": drone2,
    "drone3": drone3,
    "drone4": drone4,
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
    console.log(track);

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
    track.fadeOut();
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
