import { createSlice } from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applications: null,
  },
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    }
  },
});

export default applicationSlice.reducer;