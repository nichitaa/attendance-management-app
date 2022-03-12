import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { APIMiddleware, APIReducer, APIReducerPath } from '@feature/api/base-api-slice';
import AuthorizationSlice from '@feature/authorization/authorization-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';


const authPersistConfig = {
  key: 'attendance-management-auth',
  storage: storage,
};

const authPersistReducer = persistReducer(authPersistConfig, AuthorizationSlice.reducer);

const rootReducer = combineReducers({
  [AuthorizationSlice.name]: authPersistReducer,
  [APIReducerPath]: APIReducer,
});

export const setupStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(APIMiddleware),
    reducer: rootReducer,
  });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];