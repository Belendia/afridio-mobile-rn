import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

import reactotron from '../../reactotron.config';
import rootReducer from './rootReducer';
import {
  authEpics,
  homeEpics,
  mediaEpics,
  playlistEpics,
  searchEpics,
} from './slices';

export const rootEpic = combineEpics(
  ...authEpics,
  ...homeEpics,
  ...mediaEpics,
  ...playlistEpics,
  ...searchEpics,
);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
});

epicMiddleware.run(rootEpic);

// Redux persist
const persistor = persistStore(store);

export {store, persistor};
