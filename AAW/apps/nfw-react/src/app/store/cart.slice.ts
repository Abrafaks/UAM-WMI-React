import { createSlice } from '@reduxjs/toolkit';

const initialState = { cart: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newPizza = Object.assign({}, action.payload);

      const itemInCartIndex = state.cart.findIndex(item => item.id === newPizza.id);

      if (itemInCartIndex !== -1) {
        state.cart[itemInCartIndex].amount += 1;
      } else {
        newPizza.amount = 1;
        state.cart.push(newPizza);
      }
    },

    removeOneFromCart(state, action) {
      const pizzaToRemove = action.payload;

      const itemInCartIndex = state.cart.findIndex(item => item.id === pizzaToRemove.id);

      console.log(itemInCartIndex);

      if (itemInCartIndex !== -1) {
        if (state.cart[itemInCartIndex].amount > 1) {
          state.cart[itemInCartIndex].amount -= 1;
        } else {
          state.cart.splice(itemInCartIndex, 1);
        }
      }
    }
  }
});

export const cartActions = cartSlice.actions;
