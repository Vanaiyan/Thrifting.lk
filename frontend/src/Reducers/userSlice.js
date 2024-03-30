import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: { _id: "", firstName: "", lastName: "" },
    loginUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { setCurrentUser, setLoginUser } = userSlice.actions;
export default userSlice.reducer;
