import {createSlice} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {of, from, Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, map} from 'rxjs/operators';
import TrackPlayer, {Track} from 'react-native-track-player';
import {Action} from '../rootReducer';
import {Media} from '../../../types';
import setupPlayer from '../../services/player/SetupPlayer';

type PlayerReducerType = {
  playlistMedia: Media | null;
  currentTrackSlug: string | null;
  loop: boolean;
  isPlaying: boolean;
  showMiniPlayer: boolean;
};

const initialState: PlayerReducerType = {
  playlistMedia: null,
  currentTrackSlug: null,
  loop: false,
  isPlaying: false,
  showMiniPlayer: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCurrentTrackSlug: (state, action) => ({
      ...state,
      currentTrackSlug: action.payload,
      error: null,
    }),
    startSetTracks: (state, _) => ({
      ...state,
      error: null,
    }),
    setTracksSuccess: (state, action) => ({
      ...state,
      currentTrack: action.payload,
      isPlaying: true,
      error: null,
    }),
    setTracksFailed: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    setLoop: (state, action) => ({
      ...state,
      loop: action.payload,
    }),
    startTogglePlay: (state, _) => ({
      ...state,
    }),
    setIsPlaying: (state, action) => ({
      ...state,
      isPlaying: action.payload,
    }),
    setShowMiniPlayer: (state, action) => ({
      ...state,
      showMiniPlayer: action.payload,
    }),
    setPlaylistMedia: (state, action) => ({
      ...state,
      playlistMedia: action.payload,
    }),
  },
});

const resetAndPlay = async (tracks: Track[]) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
  } catch (e) {
    throw Error(e);
  }
};

export const setTracksEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startSetTracks.type),
    switchMap(({payload}) => {
      return from(resetAndPlay(payload)).pipe(
        mergeMap(res => of(setTracksSuccess(payload))),
        catchError(err => {
          return of(setTracksFailed(err));
        }),
      );
    }),
  );

// pause and play
export const togglePlayEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startTogglePlay.type),
    switchMap(({payload}) => {
      return from(
        new Promise(function (resolve, reject) {
          //the payload contains the value of isPlaying
          payload ? TrackPlayer.play() : TrackPlayer.pause();
          resolve(payload);
        }),
      ).pipe(
        map(res => {
          return setIsPlaying(res);
        }),
      );
    }),
  );

export const playlistEpics = [setTracksEpic, togglePlayEpic];

export const {
  setCurrentTrackSlug,
  startSetTracks,
  setTracksSuccess,
  setTracksFailed,
  setLoop,
  startTogglePlay,
  setIsPlaying,
  setShowMiniPlayer,
  setPlaylistMedia,
} = playlistSlice.actions;

export default playlistSlice.reducer;
