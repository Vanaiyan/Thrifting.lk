// store.js
import { configureStore, createReducer } from "@reduxjs/toolkit";
import messageReducer from "./Reducers/messageSlice";
import userReducer from "./Reducers/userSlice";
import productReducer from "./Reducers/productSlice";
import cartReducer from "./Reducers/cartSlice";
import wishlistReducer from "./Reducers/wishListSlice";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
