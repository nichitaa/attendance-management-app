import { baseAPI } from '@feature/api/base-api-slice';
import { IAPIResponse } from '../../types/api.types';
import qs from 'qs';

baseAPI.enhanceEndpoints({ addTagTypes: ['Attendance'] });

const attendanceAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchAttendancesByUser: build.query<
      IAPIResponse<any>,
      { id: number; filters: { from?: string; to?: string } }
    >({
      query: ({ id, filters }) => ({
        url: `/attendance/${id}`,
        params: qs.stringify(filters),
      }),
      // @ts-expect-error
      transformResponse: (response) => response.data ?? [],
      // @ts-expect-error
      providesTags: ['Attendance'],
    }),
    fetchAllAttendances: build.query({
      query: () => ({
        url: `/attendance`,
      }),
      // @ts-expect-error
      transformResponse: (response) => response.data ?? [],
      // @ts-expect-error
      providesTags: ['Attendance'],
    }),
    registerAttendance: build.mutation<
      IAPIResponse<any>,
      { fingerprintId: number }
    >({
      query: (body) => ({
        url: '/attendance',
        method: 'POST',
        body: body,
      }),
      // @ts-expect-error
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export default attendanceAPI;
