import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IFiltersState = {
  allFilters: true,
  filters: { without: true, one: true, two: true, three: true },
} as IFiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAllFilters: (state: IFiltersState) => {
      state.allFilters = !state.allFilters;

      Object.keys(state.filters).forEach((stateKey) => {
        state.filters[stateKey as keyof typeof state.filters] =
          state.allFilters;
      });
    },
    toggleAllFilter: (state: IFiltersState, action: PayloadAction<boolean>) => {
      state.allFilters = action.payload;
    },
    toggleFilter: (
      state,
      action: PayloadAction<keyof IFiltersState['filters']>,
    ) => {
      state.filters[action.payload] = !state.filters[action.payload];
    },
  },
});

export const { toggleFilter, toggleAllFilters, toggleAllFilter } =
  filtersSlice.actions;
export default filtersSlice.reducer;