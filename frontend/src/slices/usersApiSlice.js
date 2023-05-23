/* where all endpoints will work with the backend */
import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users'; //default url

export const userApiSlice = apiSlice.injectEndpoints({
  //create own endpoints and inject to apiSlice.js
  endpoints: (builder) => ({
    /* all queries and mutations */
    // login mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, //call authUser in backend userController.js
        method: 'POST',
        body: data, //data passed in from frontend
      }),
    }),
    // register mutation
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, //call registerUser in backend userController.js
        method: 'POST',
        body: data, //data passed in from frontend
      }),
    }),
    // logout mutation
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, //call logoutUser in backend userController.js
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice;

// useLoginMutation = login: builder.mutation({...})
// note: if query (ex: builder.query), use useLoginQuery
