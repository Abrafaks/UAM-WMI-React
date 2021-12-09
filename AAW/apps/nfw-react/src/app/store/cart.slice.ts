import { createSlice } from '@reduxjs/toolkit';

const initialState = { cart: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newPizza = action.payload

      const itemInCartIndex = state.cart.findIndex(item => item.key === newPizza.key);

      if (itemInCartIndex !== -1) {
        state.cart[itemInCartIndex].amount += 1
      } else {
        newPizza.amount = 1
        state.cart.push(newPizza)
      }
    }
  }
});

export const cartActions = cartSlice.actions;
