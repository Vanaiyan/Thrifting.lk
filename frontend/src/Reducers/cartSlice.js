import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartItemCount: 0,
    error: null,
  },
  reducers: {
    addToCartSuccess(state, action) {
      const newItem = action.payload;
      const existingSeller = state.cartItems[newItem.sellerId] || [];

      // Check if the item already exists in the cart
      const itemIndex = existingSeller.findIndex(
        (item) => item.productId === newItem.productId
      );

      if (itemIndex === -1) {
        // Add new item if it doesn't exist
        existingSeller.push(newItem);
      } else {
        // Update the existing item
        existingSeller[itemIndex] = {
          ...existingSeller[itemIndex],
          ...newItem, // Merge new item details (if necessary)
        };
      }

      // Update the state
      state.cartItems = {
        ...state.cartItems,
        [newItem.sellerId]: existingSeller,
      };

      // Update the cart item count
      state.cartItemCount = Object.values(state.cartItems).reduce(
        (totalCount, items) => totalCount + items.length,
        0
      );

      state.error = null;
    },
    addToCartFailure(state, action) {
      state.error = action.payload;
    },
    getCartSuccess(state, action) {
      state.cartItems = action.payload;
      state.cartItemCount = Object.values(action.payload).reduce(
        (totalCount, items) => totalCount + items.length,
        0
      );
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
      state.cartItemCount = Object.values(updatedCartItems).reduce(
        (totalCount, items) => totalCount + items.length,
        0
      );
    },
    updatesoldConfirmedSellerReducer(state, action) {
      const { productId, soldConfirmedBuyer } = action.payload;

      // Iterate over each seller ID in the cartItems object
      Object.keys(state.cartItems).forEach((sellerId) => {
        // Find the index of the product with the given productId in the current seller's array
        const productIndex = state.cartItems[sellerId].findIndex(
          (item) => item.productId === productId
        );

        // If the product is found in the current seller's array
        if (productIndex !== -1) {
          // Update the soldConfirmedBuyer status of the product
          state.cartItems[sellerId][productIndex].soldConfirmedBuyer =
            soldConfirmedBuyer;
        }
      });

      state.error = null;
    },
  },
});

export const {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCart,
  updatesoldConfirmedSellerReducer,
} = cartSlice.actions;

export default cartSlice.reducer;
