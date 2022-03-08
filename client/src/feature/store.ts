import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { APIMiddleware, APIReducer, APIReducerPath } from '@feature/api/base-api-slice';


const rootReducer = combineReducers({
  [APIReducerPath]: APIReducer,
});

export const setupStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(APIMiddleware),
    reducer: rootReducer,
  });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];