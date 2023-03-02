import { createSlice } from '@reduxjs/toolkit';

export const scholarshipSlice = createSlice({
  name: 'scholarship',
  initialState: {
    scholarships: null,
  },
  reducers: {
    setScholarships: (state, action) => {
      state.user = action.payload;
    }
  },
});

export default scholarshipSlice.reducer;