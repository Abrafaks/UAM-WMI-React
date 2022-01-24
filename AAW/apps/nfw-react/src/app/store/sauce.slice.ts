import { createSlice } from '@reduxjs/toolkit';

const initialState = { sauces: [] };

export const sauceSlice = createSlice({
  name: 'sauce',
  initialState,
  reducers: {
    setSauces(state, action) {
      state.sauces = action.payload;
    },
  }
});

export const sauceActions = sauceSlice.actions;
