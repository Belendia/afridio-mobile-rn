import {createSlice} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {of, from, Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, map} from 'rxjs/operators';
import TrackPlayer, {Track} from 'react-native-track-player';
import {Action} from '../rootReducer';
import {Media} from '../../../types';
import setupPlayer from '../../services/player/SetupPlayer';
import {CheckboxOption} from '../../components';

type PlayerReducerType = {
  playlistMedia: Media | null;
  currentTrack: Track;
  loop: boolean;
  isPlaying: boolean;
  showMiniPlayer: boolean;
  currentTrackIndex: number;
  playbackSpeed: CheckboxOption;
};

const initialState: PlayerReducerType = {
  playlistMedia: null,
  currentTrack: {
    id: '',
    title: '',
    artist: '',
    duration: 0,
    artwork: '',
    url: '',
  },
  loop: false,
  isPlaying: false,
  showMiniPlayer: false,
  currentTrackIndex: 0,
  playbackSpeed: {key: 1, title: '1.0x'},
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => ({
      ...state,
      currentTrack: action.payload,
      error: null,
    }),
    startSetCurrentTrack: (state, _) => ({
      ...state,
      error: null,
    }),
    setCurrentTrackSuccess: (state, action) => ({
      ...state,
      currentTrack: action.payload,
      isPlaying: true,
      error: null,
    }),
    setCurrentTrackFailed: (state, action) => ({
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
    setCurrentTrackIndex: (state, action) => ({
      ...state,
      currentTrackIndex: action.payload,
    }),
    setPlaylistMedia: (state, action) => ({
      ...state,
      playlistMedia: action.payload,
    }),
    setPlaybackSpeed: (state, action) => ({
      ...state,
      playbackSpeed: action.payload,
    }),
  },
});

const resetAndPlay = async (currentTrack: Track) => {
  try {
    // await TrackPlayer.reset()
    // await TrackPlayer.add(currentTrack);
    // TrackPlayer.play();
    setupPlayer()
      .then(() => TrackPlayer.reset())
      .then(() => TrackPlayer.add(currentTrack))
      .then(() => TrackPlayer.play());
  } catch (e) {
    throw Error(e);
  }
};

export const setCurrentTrackEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startSetCurrentTrack.type),
    switchMap(({payload}) => {
      return from(resetAndPlay(payload)).pipe(
        mergeMap(res =>
          //used mergeMap to dispatch two actions
          of(setCurrentTrackSuccess(payload)),
        ),
        catchError(err => {
          return of(setCurrentTrackFailed(err));
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

export const playlistEpics = [setCurrentTrackEpic, togglePlayEpic];

export const {
  setCurrentTrack,
  startSetCurrentTrack,
  setCurrentTrackSuccess,
  setCurrentTrackFailed,
  setLoop,
  startTogglePlay,
  setIsPlaying,
  setShowMiniPlayer,
  setCurrentTrackIndex,
  setPlaylistMedia,
  setPlaybackSpeed,
} = playlistSlice.actions;

export default playlistSlice.reducer;
