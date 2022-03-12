import { baseAPI } from './base-api-slice';


baseAPI.enhanceEndpoints({addTagTypes: ['Users']})

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<{ isSuccess: boolean; message?: string; error?: string, data?: any }, {email: string, password: string}>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    fetchAllUsers: build.query({
      query: () => ({
        url: `/auth/users`,
      }),
      // @ts-expect-error
      providesTags: ['Users']
    }),
  })
});

export default userAPI;
