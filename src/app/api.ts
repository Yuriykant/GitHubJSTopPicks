import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  endpoints: (builder) => ({
    getRepo: builder.query({
      query: ({ limit }) => ({
        url: '/search/repositories?q=language:js&sort=stars',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetRepoQuery } = apiSlice;
