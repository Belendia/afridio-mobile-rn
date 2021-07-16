import TrackPlayer, {Track} from 'react-native-track-player';
import {store} from '../../redux/store';

import {
  setCurrentTrack,
  setCurrentTrackIndex,
  setIsPlaying,
  setPlaylistMedia,
} from '../../redux/slices/playlistSlice';
import {getTrack} from '../../helpers/Utils';

let flag = false;

async function backgroundPlayback(track: Track, currentTrackIndex: number) {
  if (flag) return;
  flag = true;

  setTimeout(() => (flag = false), 250);
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  // setupPlayer().then(() => TrackPlayer.add(track));
  store.dispatch(setCurrentTrack(track));
  store.dispatch(setCurrentTrackIndex(currentTrackIndex));
  TrackPlayer.play();
  store.dispatch(setIsPlaying(true));
}

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    store.dispatch(setIsPlaying(true));
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    store.dispatch(setIsPlaying(false));
  });

  TrackPlayer.addEventListener('remote-next', () => {
    let {playlistReducer} = store.getState();
    let {currentTrackIndex, playlistMedia} = playlistReducer;

    if (playlistMedia) {
      if (currentTrackIndex === playlistMedia.tracks.length - 1) {
        backgroundPlayback(getTrack(playlistMedia, 0), 0);
      } else {
        backgroundPlayback(
          getTrack(playlistMedia, currentTrackIndex + 1),
          currentTrackIndex + 1,
        );
      }
    }
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    const {playlistReducer} = store.getState();
    const {currentTrackIndex, playlistMedia} = playlistReducer;

    if (playlistMedia) {
      if (currentTrackIndex === 0) {
        backgroundPlayback(
          getTrack(playlistMedia, playlistMedia.tracks.length - 1),
          playlistMedia.tracks.length - 1,
        );
      } else {
        backgroundPlayback(
          getTrack(playlistMedia, currentTrackIndex - 1),
          currentTrackIndex - 1,
        );
      }
    }
  });

  TrackPlayer.addEventListener('playback-queue-ended', ({position}) => {
    const {playlistReducer} = store.getState();
    const {currentTrack, currentTrackIndex, loop, playlistMedia} =
      playlistReducer;

    if (position > 0) {
      if (loop) {
        backgroundPlayback(currentTrack, currentTrackIndex);
      } else {
        if (playlistMedia) {
          if (currentTrackIndex === playlistMedia.tracks.length - 1) {
            // When we reach on the final track, we reset everything.
            TrackPlayer.reset();
            store.dispatch(setIsPlaying(false));
            store.dispatch(setCurrentTrackIndex(0));
            store.dispatch(setCurrentTrack(null));
            store.dispatch(setPlaylistMedia(null));
          } else {
            backgroundPlayback(
              getTrack(playlistMedia, currentTrackIndex + 1),
              currentTrackIndex + 1,
            );
          }
        }
      }
    }
  });
};
