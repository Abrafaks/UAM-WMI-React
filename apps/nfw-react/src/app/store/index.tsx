import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {navSlice} from "./nav.slice";

export const store = configureStore({
  reducer:{
    nav: navSlice.reducer
  }
})

export const rootReducer = combineReducers({
  nav: navSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
