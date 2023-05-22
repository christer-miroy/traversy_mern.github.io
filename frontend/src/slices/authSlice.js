/* local reducer */
import { createSlice } from '@reduxjs/toolkit';

// check localStorage
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setCredentials function - set userInfo to localStorage
    setCredentials: (state, action) => {
      //user data = action
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); //save to localStorage
    },
    // logout function - take info out of localStorage
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
