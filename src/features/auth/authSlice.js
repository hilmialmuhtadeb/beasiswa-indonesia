import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    }
  },
});

export const authUser = (state) => state.auth.user;
export const IsAdmin = (state) => state.auth.isAdmin;
export default authSlice.reducer;