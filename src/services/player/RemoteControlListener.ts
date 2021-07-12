import TrackPlayer, {Track} from 'react-native-track-player';
import {store} from '../../redux/store';

import {
  setCurrentTrack,
  setCurrentTrackIndex,
  startToSetPlayback,
} from '../../redux/slices/playlistSlice';
import {getTrack} from '../../helpers/Utils';

let flag = false;

async function backgroundPlayback(track: Track, currentTrackIndex: number) {
  if (flag) return;
  flag = true;

  setTimeout(() => (flag = false), 250);
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  store.dispatch(setCurrentTrack(track));
  store.dispatch(setCurrentTrackIndex(currentTrackIndex));
  TrackPlayer.play();
  store.dispatch(startToSetPlayback(true));
}

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    store.dispatch(startToSetPlayback(true));
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    store.dispatch(startToSetPlayback(false));
  });

  TrackPlayer.addEventListener('remote-next', () => {
    let {playlistReducer, mediaReducer} = store.getState();
    let {currentTrackIndex} = playlistReducer;
    let {media} = mediaReducer;

    if (media) {
      if (currentTrackIndex === media.tracks.length - 1) {
        backgroundPlayback(getTrack(media, 0), 0);
      } else {
        backgroundPlayback(
          getTrack(media, currentTrackIndex + 1),
          currentTrackIndex + 1,
        );
      }
    }
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    const {playlistReducer, mediaReducer} = store.getState();
    const {currentTrackIndex} = playlistReducer;
    const {media} = mediaReducer;

    if (media) {
      if (currentTrackIndex === 0) {
        backgroundPlayback(
          getTrack(media, media.tracks.length - 1),
          media.tracks.length - 1,
        );
      } else {
        backgroundPlayback(
          getTrack(media, currentTrackIndex - 1),
          currentTrackIndex - 1,
        );
      }
    }
  });

  TrackPlayer.addEventListener('playback-queue-ended', ({position}) => {
    const {playlistReducer, mediaReducer} = store.getState();
    const {currentTrack, currentTrackIndex, loop} = playlistReducer;
    const {media} = mediaReducer;

    if (position > 0) {
      if (loop) {
        backgroundPlayback(currentTrack, currentTrackIndex);
      } else {
        if (media) {
          if (currentTrackIndex === media.tracks.length - 1) {
            backgroundPlayback(getTrack(media, 0), 0);
          } else {
            backgroundPlayback(
              getTrack(media, currentTrackIndex + 1),
              currentTrackIndex + 1,
            );
          }
        }
      }
    }
  });
};
