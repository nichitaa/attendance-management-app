import { baseAPI } from './base-api-slice';
import { IAPIResponse } from '../../types/api.types';
import { UserCreationAttributes } from '../../types/user.types';

baseAPI.enhanceEndpoints({ addTagTypes: ['Users'] });

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<
      IAPIResponse<any>,
      { email: string; password: string }
    >({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    createUser: build.mutation<IAPIResponse<any>, UserCreationAttributes>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body: body,
      }),
      // @ts-expect-error
      invalidatesTags: ['Users'],
    }),
    fetchAllUsers: build.query({
      query: () => ({
        url: `/user`,
      }),
      // @ts-expect-error
      transformResponse: (response) => response.data ?? [],
      // @ts-expect-error
      providesTags: ['Users'],
    }),
  }),
});

export default userAPI;
