import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filterSlice';
import tabsSlice from './tabsSlice';
import ticketsSlice from './ticketsSlice';

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    tabs: tabsSlice,
    tickets: ticketsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;