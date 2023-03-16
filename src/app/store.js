import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import scholarshipReducer from '../features/scholarship/scholarshipSlice';
import applicationReducer from '../features/application/applicationSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    scholarship: scholarshipReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
