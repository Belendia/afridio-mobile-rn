import TrackPlayer from 'react-native-track-player';
import {store} from '../../redux/store';

import {
  setCurrentTrackSlug,
  setIsPlaying,
  setPlaylistMedia,
} from '../../redux/slices/playlistSlice';
import {getNextTrackSlug, getPreviousTrackSlug} from '../../helpers/Utils';

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
    const {playlistReducer} = store.getState();
    const {currentTrackSlug, playlistMedia} = playlistReducer;

    if (playlistMedia?.tracks) {
      const nextTrackSlug = getNextTrackSlug(
        playlistMedia?.tracks,
        currentTrackSlug,
      );
      if (nextTrackSlug) TrackPlayer.skip(nextTrackSlug);
    }
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    const {playlistReducer} = store.getState();
    const {currentTrackSlug, playlistMedia} = playlistReducer;

    if (playlistMedia?.tracks) {
      const nextTrackSlug = getPreviousTrackSlug(
        playlistMedia?.tracks,
        currentTrackSlug,
      );
      if (nextTrackSlug) TrackPlayer.skip(nextTrackSlug);
    }
  });

  TrackPlayer.addEventListener('playback-track-changed', ({nextTrack}) => {
    store.dispatch(setCurrentTrackSlug(nextTrack));
  });

  TrackPlayer.addEventListener('playback-queue-ended', ({position, track}) => {
    TrackPlayer.reset();
    store.dispatch(setIsPlaying(false));
    store.dispatch(setPlaylistMedia(null));
  });
};
