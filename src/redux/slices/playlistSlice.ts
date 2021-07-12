import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, from, Observable } from "rxjs";
import { catchError, mergeMap, switchMap, map } from "rxjs/operators";
import TrackPlayer, { Track } from "react-native-track-player";
import { Action } from "../rootReducer";

type PlayerReducerType = {
  currentTrack: Track;
  loop: boolean;
  isPlaying: boolean;
  showMiniPlayer: boolean;
  currentTrackIndex: number;
};

const initialState: PlayerReducerType = {
  currentTrack: {
    id: "",
    title: "",
    artist: "",
    duration: 0,
    artwork: "",
    url: "",
  },
  loop: false,
  isPlaying: false,
  showMiniPlayer: true,
  currentTrackIndex: 0,
};

const playlistSlice = createSlice({
  name: "playlist",
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
    startToSetPlayback: (state, _) => ({
      ...state,
    }),
    setPlaybackSuccess: (state, action) => ({
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
  },
});

const resetAndPlay = async (currentTrack: Track) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrack);
    TrackPlayer.play();
  } catch (e) {
    throw Error(e);
  }
};

export const setCurrentTrackEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startSetCurrentTrack.type),
    switchMap(({ payload }) => {
      console.log("!!!!!!!!!!!!!!!!!");
      console.log(payload);
      console.log("!!!!!!!!!!!!!!!!!");
      return from(resetAndPlay(payload)).pipe(
        mergeMap((res) =>
          //used mergeMap to dispatch two actions
          of(setCurrentTrackSuccess(payload), setPlaybackSuccess(true))
        ),
        catchError((err) => {
          return of(setCurrentTrackFailed(err));
        })
      );
    })
  );

// pause and play
export const setPlaybackEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToSetPlayback.type),
    switchMap(({ payload }) => {
      return from(
        new Promise(function (resolve, reject) {
          //the payload contains the value of isPlaying
          payload ? TrackPlayer.play() : TrackPlayer.pause();
          resolve(payload);
        })
      ).pipe(
        map((res) => {
          return setPlaybackSuccess(res);
        })
      );
    })
  );

export const playlistEpics = [setCurrentTrackEpic, setPlaybackEpic];

export const {
  setCurrentTrack,
  startSetCurrentTrack,
  setCurrentTrackSuccess,
  setCurrentTrackFailed,
  setLoop,
  startToSetPlayback,
  setPlaybackSuccess,
  setShowMiniPlayer,
  setCurrentTrackIndex,
} = playlistSlice.actions;

export default playlistSlice.reducer;
