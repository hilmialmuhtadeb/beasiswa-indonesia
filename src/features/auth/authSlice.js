import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAdmin: false,
    profile: null,
    applications: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    addUserApplications: (state, action) => {
      state.applications.push(action.payload);
    }
  },
});

export const authUser = (state) => state.auth.user;
export const isAdmin = (state) => state.auth.isAdmin;
export default authSlice.reducer;