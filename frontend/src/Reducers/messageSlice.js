import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    chatId: "",
    messages: [],
    keyword: "",
    userPRender: 0,
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setkeyword: (state, action) => {
      state.keyword = action.payload;
    },
    incrementUserPRender: (state) => {
      state.userPRender += 1;
    },
  },
});

export const { setChatId, setMessages, setkeyword, incrementUserPRender } =
  messagesSlice.actions;
export default messagesSlice.reducer;
