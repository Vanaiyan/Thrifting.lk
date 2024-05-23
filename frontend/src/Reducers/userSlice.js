import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: { _id: "", firstName: "", lastName: "" },
    loginUser: null,
    unreadMessages: {}, // to track unread messages for each user
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    setUnreadMessages: (state, action) => {
      const { userId, count } = action.payload;
      state.unreadMessages[userId] = count;
    },
    resetUnreadMessages: (state, action) => {
      const userId = action.payload;
      state.unreadMessages[userId] = 0;
    },
  },
});

export const {
  setCurrentUser,
  setLoginUser,
  setUnreadMessages,
  resetUnreadMessages,
} = userSlice.actions;
export default userSlice.reducer;
