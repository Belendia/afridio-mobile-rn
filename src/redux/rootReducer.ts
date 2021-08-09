import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';
import mediaReducer from './slices/mediaSlice';
import layoutReducer from './slices/layoutSlice';
import playlistReducer from './slices/playlistSlice';
import searchReducer from './slices/searchSlice';

// Redux persist
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'authReducer',
    'homeReducer',
    'mediaReducer',
    'layoutReducer',
    'playlistReducer',
    'searchReducer',
  ],
};

// authReducer
const authReducerPersistConfig = {
  key: 'authReducer',
  storage: AsyncStorage,
  whitelist: ['user', 'userDataSynced'],
};

const persistedAuthReducer = persistReducer(
  authReducerPersistConfig,
  authReducer,
);

// mediaReducer
const mediaReducerPersistConfig = {
  key: 'mediaReducer',
  storage: AsyncStorage,
  whitelist: ['library'],
};

const persistedMediaReducer = persistReducer(
  mediaReducerPersistConfig,
  mediaReducer,
);

const rootReducer = combineReducers({
  authReducer: persistedAuthReducer,
  homeReducer,
  mediaReducer: persistedMediaReducer,
  layoutReducer,
  playlistReducer,
  searchReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type Action<P> = {type: string; payload?: P};

export default persistReducer(rootPersistConfig, rootReducer);
