import {createSlice} from '@reduxjs/toolkit';
import {ofType} from 'redux-observable';
import {of, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import AfridioApiService from '../../services/network/AfridioApiService';
import {Action} from '../rootReducer';
import {authLogout} from './authSlice';
import {Language, Format, Genre} from './../../../types';

type SearchBy = {
  languages?: Language[];
  formats?: Format[];
  genres?: Genre[];
};
type SearchReducerType = {
  searchBy: SearchBy | null;
  loadingSearchBy: boolean;
};

const initialState: SearchReducerType = {
  searchBy: null,
  loadingSearchBy: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startToGetSearchBy: state => ({
      ...state,
      loadingSearchBy: true,
    }),
    searchBySuccess: (state, action) => ({
      ...state,
      searchBy: action.payload,
      loadingSearchBy: false,
    }),
    searchByFailed: state => ({
      ...state,
      loadingSearchBy: false,
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
          if (err && err._status === 401) {
            return of(authLogout('logout'));
          }
          return of(searchByFailed());
        }),
      );
    }),
  );

export const searchEpics = [getSearchByEpic];

export const {startToGetSearchBy, searchBySuccess, searchByFailed} =
  searchSlice.actions;

export default searchSlice.reducer;