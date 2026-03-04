import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, TimeFilter, UserFilter } from '../../../types/dashboard.types';

const initialState: DashboardState = {
  timeFilter: 'Monthly',
  userFilter: 'New',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeFilter: (state, action: PayloadAction<TimeFilter>) => {
      state.timeFilter = action.payload;
    },
    setUserFilter: (state, action: PayloadAction<UserFilter>) => {
      state.userFilter = action.payload;
    },
  },
});

export const { setTimeFilter, setUserFilter } = dashboardSlice.actions;
export default dashboardSlice.reducer;