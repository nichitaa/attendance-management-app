import { baseAPI } from './base-api-slice';
import { IAPIResponse } from '../../types/api.types';

baseAPI.enhanceEndpoints({ addTagTypes: ['Departments'] });

const departmentsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchAllDepartments: build.query<any[], undefined>({
      query: () => ({
        url: `/department`,
      }),
      // @ts-expect-error
      transformResponse: (response) => response.data ?? [],
      // @ts-expect-error
      providesTags: ['Departments'],
    }),
    createDepartment: build.mutation<IAPIResponse<any>, { name: string }>({
      query: (body) => ({
        url: '/department',
        method: 'POST',
        body: body,
      }),
      // @ts-expect-error
      invalidatesTags: ['Departments'],
    }),
    updateDepartment: build.mutation<IAPIResponse<any>, { name: string; id: number }>({
      query: (body) => ({
        url: `/department/${body.id}`,
        method: 'PATCH',
        body: body,
      }),
      // @ts-expect-error
      invalidatesTags: ['Departments'],
    }),
  }),
});

export default departmentsAPI;
