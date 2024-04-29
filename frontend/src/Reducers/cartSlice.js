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
      const updatedCartItems = { ...state.cartItems };

      Object.keys(updatedCartItems).forEach((sellerId) => {
        updatedCartItems[sellerId] = updatedCartItems[sellerId].filter(
          (item) => item.productId !== productId
        );

        // Remove the seller ID entry if there are no more items for that seller
        if (updatedCartItems[sellerId].length === 0) {
          delete updatedCartItems[sellerId];
        }
      });

      // Update state with the modified cart items
      state.cartItems = updatedCartItems;
    },
    updateCartItemQuantitySuccess(state, action) {
      const { productId, newQuantity } = action.payload;
      console.log("Try to change quantity");

      // Iterate over each seller ID in the cartItems object
      Object.keys(state.cartItems).forEach((sellerId) => {
        // Find the index of the product with the given productId in the current seller's array
        const productIndex = state.cartItems[sellerId].findIndex(
          (item) => item.productId === productId
        );

        // If the product is found in the current seller's array
        if (productIndex !== -1) {
          // Update the quantity of the product
          state.cartItems[sellerId][productIndex].quantity = newQuantity;
        }
      });

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
