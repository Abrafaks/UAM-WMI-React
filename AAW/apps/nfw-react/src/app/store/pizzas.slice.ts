import { createSlice } from '@reduxjs/toolkit';

const initialState = { pizzas: [] };

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
      console.log(state.pizzas)
    },
  }
});

export const pizzasActions = pizzasSlice.actions;
