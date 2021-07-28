import {createSlice} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {of, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import AfridioApiService from '../../services/network/AfridioApiService';
import {Action} from '../rootReducer';
import {authLogout} from './authSlice';
import {Language, Format, Genre, Media} from './../../../types';

type SearchBy = {
  languages?: Language[];
  formats?: Format[];
  genres?: Genre[];
};
type SearchReducerType = {
  searchBy: SearchBy | null;
  loadingSearchBy: boolean;
  searchResult: Media[] | null;
  error: string | null;
  searching: boolean;
};

const initialState: SearchReducerType = {
  searchBy: null,
  loadingSearchBy: false,
  searchResult: null,
  error: null,
  searching: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startToGetSearchBy: state => ({
      ...state,
      loadingSearchBy: true,
      error: null,
    }),
    searchBySuccess: (state, action) => ({
      ...state,
      searchBy: action.payload,
      loadingSearchBy: false,
    }),
    searchByFailed: (state, action) => ({
      ...state,
      loadingSearchBy: false,
      error: action.payload,
    }),
    startSearchingMedia: (state, payload) => ({
      ...state,
      searching: true,
      error: null,
    }),
    searchMediaSuccess: (state, action) => ({
      ...state,
      searching: false,
      searchResult: action.payload,
    }),
    searchMediaFailed: (state, action) => ({
      ...state,
      searching: false,
      error: action.payload,
    }),
    clearSearchResult: state => ({
      ...state,
      searching: false,
      searchResult: null,
    }),
  },
});

export const getSearchByEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetSearchBy.type),
    switchMap(() => {
      return AfridioApiService.searchBy().pipe(
        map(res => {
          return searchBySuccess(res);
        }),
        catchError(err => {
          let message = 'Something went wrong';
          if (err && err._status === 'Offline') {
            message = err._message;
          } else if (err && err._status === 401) {
            return of(authLogout('logout'));
          }
          return of(searchByFailed(message));
        }),
      );
    }),
  );

export const getSearchEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startSearchingMedia.type),
    switchMap(({payload}) => {
      const {search, format, language, genre} = payload;
      return AfridioApiService.mediaSearch(
        search,
        format,
        language,
        genre,
      ).pipe(
        map(res => {
          return searchMediaSuccess(res.results);
        }),
        catchError(err => {
          let message = 'Something went wrong';
          if (err && err._status === 'Offline') {
            message = err._message;
          } else if (err && err._status === 401) {
            return of(authLogout('logout'));
          }
          return of(searchMediaFailed(message));
        }),
      );
    }),
  );

export const searchEpics = [getSearchByEpic, getSearchEpic];

export const {
  startToGetSearchBy,
  searchBySuccess,
  searchByFailed,
  startSearchingMedia,
  searchMediaSuccess,
  searchMediaFailed,
  clearSearchResult,
} = searchSlice.actions;

export default searchSlice.reducer;
