/* make async requests to backend */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// boiler plates
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], //cache
  endpoints: (builder) => ({}), //dependency injections
});
