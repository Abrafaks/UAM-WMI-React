import {createSlice} from '@reduxjs/toolkit'

const initialState = {active: 'home'}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    activateHome(state) {
      state.active = 'home'
    },
    activateMenu(state) {
      state.active = 'menu'
    },
    activateCart(state) {
      state.active = 'cart'
    }
  }
})

export const navActions = navSlice.actions
