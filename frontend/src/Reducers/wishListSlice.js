import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlistItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getWishlistItemsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.wishlistItems = action.payload;
    },
    getWishlistItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromWishlistRedux(state, action) {
      const productIdToRemove = action.payload;
      console.log(productIdToRemove);
      const itemIndex = state.wishlistItems.products.findIndex(
        (item) => item.productId === productIdToRemove
      );
      if (itemIndex !== -1) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.productId !== productIdToRemove
        );
      }
    },
  },
});

export const {
  getWishlistItemsStart,
  getWishlistItemsSuccess,
  getWishlistItemsFailure,
  removeFromWishlistRedux,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
