import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    filters: filtersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
