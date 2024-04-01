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
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
    },
    updateCartItemQuantitySuccess(state, action) {
      const { productId, newQuantity } = action.payload;
      console.log("Try to change qunatity");

      // Find the index of the product in the cartItems array
      const productIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex !== -1) {
        // Update the quantity of the product
        state.cartItems[productIndex].quantity = newQuantity;
      }
      state.error = null;
    },
    updateCartItemQuantityFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCart,
  updateCartItemQuantitySuccess,
  updateCartItemQuantityFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
