// store.js
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./Reducers/messageSlice";
import userReducer from "./Reducers/userSlice";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
  },
});

export default store;
