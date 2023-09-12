import { configureStore } from '@reduxjs/toolkit'

import  ticketsReducer  from './ticketsSlice'
import tabsReducer from './tabsSlice'
import filterReducer from './filterSlice'


const store = configureStore({
    reducer: {
      filter: filterReducer,
      tabs: tabsReducer,
      tickets: ticketsReducer,
    }
  }, 
)

export default store

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch