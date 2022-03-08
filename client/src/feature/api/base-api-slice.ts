import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost/8080`,
  // prepareHeaders: (headers, { getState }) => {
  //   // @ts-ignore
  //   const { bearerToken } = getState().authorization;
  //   if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);
  //   return headers;
  // },
  credentials: 'include',
  mode: 'cors',
});


export const baseAPI = createApi({
  reducerPath: 'API',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});


export const {
  reducerPath: APIReducerPath,
  reducer: APIReducer,
  middleware: APIMiddleware,
} = baseAPI;
