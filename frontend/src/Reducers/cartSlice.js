import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    error: null,
  },
  reducers: {
    addToCartSuccess(state, action) {
      state.cartItems = action.payload;
      state.error = null;
    },
    addToCartFailure(state, action) {
      state.error = action.payload;
    },
    getCartSuccess(state, action) {
      state.cartItems = action.payload;
      state.error = null;
    },
    getCartFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
