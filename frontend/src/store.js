// store.js
import { configureStore, createReducer } from "@reduxjs/toolkit";
import messageReducer from "./Reducers/messageSlice";
import userReducer from "./Reducers/userSlice";
import productReducer from "./Reducers/productSlice";
import cartReducer from "./Reducers/cartSlice";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
