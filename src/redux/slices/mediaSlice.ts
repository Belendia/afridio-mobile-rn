import {createSlice} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {of, Observable, from} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {Media} from '../../../types';
import {Action} from '../rootReducer';
import AfridioApiService from '../../services/network/AfridioApiService';
import {authLogout} from './authSlice';
import {deleteTracks, getQueryParam} from '../../helpers/Utils';

type MediaReducerType = {
  media: Media | null;
  mediaListByFormat: Media[];
  selectedMediaSlug: string | null;
  error: object | null;
  mediaListByFormatError: object | null;
  loading: boolean;
  loadingList: boolean;
  next: number;
  library: Media[];
};

const initialState: MediaReducerType = {
  media: null,
  mediaListByFormat: [],
  selectedMediaSlug: null,
  error: null,
  mediaListByFormatError: null,
  loading: false,
  loadingList: false,
  next: 0,
  library: [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    startToGetMedia: (state, _) => ({
      ...state,
      loading: true,
      media: null,
      loadingList: false,
      error: null,
      mediaListByFormatError: null,
    }),
    getMediaSuccess: (state, action) => ({
      ...state,
      media: action.payload,
      loading: false,
      error: null,
      mediaListByFormatError: null,
    }),
    getMediaFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      media: null,
    }),
    setMediaLoadingTrue: state => ({
      ...state,
      loading: true,
    }),
    startToGetMediaListByFormat: (state, _) => ({
      ...state,
      loadingList: true,
      mediaListByFormatError: null,
    }),
    getMediaListByFormatSuccess: (state, action) => ({
      ...state,
      mediaListByFormat: [
        ...state.mediaListByFormat,
        ...action.payload.results,
      ],
      next: action.payload.next,
      loadingList: false,
      mediaListByFormatError: null,
    }),
    getMediaListByFormatFailed: (state, action) => ({
      ...state,
      mediaListByFormatError: action.payload,
      loadingList: false,
    }),
    clearMedia: state => ({
      ...state,
      media: null,
      mediaListByFormat: [],
    }),
    setMediaSlug: (state, action) => ({
      ...state,
      selectedMediaSlug: action.payload,
    }),
    addToLibrary(state, action) {
      state.library.push(action.payload);
    },
    startToRemoveFromLibrary: (state, action) => ({
      ...state,
    }),
    removeFromLibrary(state, action) {
      state.library.splice(action.payload, 1);
    },
    markTrackAsDownloaded(state, action) {
      const m = state.library.find(m => m.slug === action.payload.media.slug);
      if (m) {
        const t = m.tracks.find(t => t.slug === action.payload.track.slug);
        if (t) {
          t.file_url = action.payload.track.file_url;
          t.downloaded = true;
        }
      }
    },
  },
});

export const getMediaEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetMedia.type),
    switchMap(({payload: slug}) => {
      return AfridioApiService.media(slug).pipe(
        map(res => {
          return getMediaSuccess(res);
        }),
        catchError(err => {
          console.log(JSON.stringify(err));
          let message = 'Something went wrong';
          if (err && err._status === 'Offline') {
            message = err._message;
          } else if (err && err._status === 404) {
            message = 'Media not found';
          } else if (err && err._status === 401) {
            return of(authLogout('logout'));
          }
          return of(getMediaFailed(message));
        }),
      );
    }),
  );

export const getMediaListByFormatEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetMediaListByFormat.type),
    switchMap(({payload}) => {
      const {slug, page} = payload;

      return AfridioApiService.mediaListByFormat(slug, page).pipe(
        map(res => {
          if (res.next) {
            const r = {
              results: res.results,
              next: getQueryParam(res.next, 'page'),
            };
            return getMediaListByFormatSuccess(r);
          }

          return getMediaListByFormatSuccess(res);
        }),
        catchError(err => {
          let message = 'Something went wrong';
          if (err && err._status === 'Offline') {
            message = err._message;
          } else if (err && err._status === 401) {
            return of(authLogout('logout'));
          }
          return of(getMediaListByFormatFailed(message));
        }),
      );
    }),
  );

export const deleteTracksEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToRemoveFromLibrary.type),
    switchMap(({payload}) => {
      const {index, media} = payload;
      return from(
        new Promise(function (resolve, reject) {
          deleteTracks(media);
          resolve(index);
        }),
      ).pipe(
        map(res => {
          return removeFromLibrary(res);
        }),
      );
    }),
  );

export const mediaEpics = [getMediaEpic, getMediaListByFormatEpic];

export const {
  startToGetMedia,
  getMediaSuccess,
  getMediaFailed,
  setMediaLoadingTrue,
  startToGetMediaListByFormat,
  getMediaListByFormatSuccess,
  getMediaListByFormatFailed,
  clearMedia,
  setMediaSlug,
  addToLibrary,
  startToRemoveFromLibrary,
  removeFromLibrary,
  markTrackAsDownloaded,
} = mediaSlice.actions;

export default mediaSlice.reducer;
