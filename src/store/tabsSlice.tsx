import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ITabsState = {
  tabs: 'cheaper' 
} as ITabsState;

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    toggleTabs(state: ITabsState, action: PayloadAction<'cheaper' | 'faster' | 'optimal'>) {
      state.tabs = action.payload;
    },
  },
});

export const { toggleTabs } = tabsSlice.actions;
export default tabsSlice.reducer;