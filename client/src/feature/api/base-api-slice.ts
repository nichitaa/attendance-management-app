import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import authorizationSlice, {
  clearUserState,
  setAuthorizedUser,
} from '../authorization/authorization-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:8080`,
  prepareHeaders: (headers, { getState }) => {
    // @ts-ignore
    const { bearerToken } = getState().authorization;
    if (bearerToken) headers.set('Authorization', `Bearer ${bearerToken}`);
    return headers;
  },
  credentials: 'include',
  mode: 'cors',
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as any).error === 'Access token has expired!'
  ) {
    /** Access token has expired -> get new token */
    const authSlice = api.getState()[authorizationSlice.name];
    const refreshToken = authSlice.refreshToken;

    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if ((refreshResult as any).data.isSuccess) {
      api.dispatch(setAuthorizedUser((refreshResult as any).data.data));
      // retry the initial query
      const result = await baseQuery(args, api, extraOptions);
      return result;
    } else {
      /** Refresh token has expired -> logout */
      api.dispatch(clearUserState());
    }
  }
  return result;
};

export const baseAPI = createApi({
  reducerPath: 'API',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export const {
  reducerPath: APIReducerPath,
  reducer: APIReducer,
  middleware: APIMiddleware,
} = baseAPI;
