import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProjectId: 'all', // 'all' or project id
  priorityFilter: 'all',    // 'all' | 'high' | 'medium' | 'low'
  searchQuery: '',
  activeTab: 'Dashboard',   // 'Dashboard' | 'Projects' | 'Tasks' | 'Focus'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    resetFilters: (state) => {
      state.selectedProjectId = 'all';
      state.priorityFilter = 'all';
      state.searchQuery = '';
    },
  },
});

export const {
  setSelectedProjectId,
  setPriorityFilter,
  setSearchQuery,
  setActiveTab,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectActiveTab = (state) => state.filters.activeTab;

export default filtersSlice.reducer;
