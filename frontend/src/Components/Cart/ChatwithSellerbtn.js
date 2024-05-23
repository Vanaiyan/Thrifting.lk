// src/components/ChatWithSellerButton.js

import React from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatId, setMessages } from "../../Reducers/messageSlice";
import { getMessagesForChat } from "../../Actions/chatFirebase";
import {
  getSellerProfileAction,
  getUserProfile,
} from "../../Actions/chatActions";
import { setCurrentUser, setLoginUser } from "../../Reducers/userSlice";

const ChatWithSellerButton = ({ seller }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser, currentUser } = useSelector((state) => state.user);

  const handleChatWithSeller = async () => {
    const UserProfile = await getUserProfile();
    if (UserProfile && UserProfile.user) {
      // Dispatch only if user profile is available
      dispatch(setLoginUser(UserProfile.user));
    }

    // Fetch seller profile
    const SellerProfile = await getSellerProfileAction(seller);
    if (SellerProfile && SellerProfile.user) {
      // Dispatch only if seller profile is available
      dispatch(setCurrentUser(SellerProfile.user));
    }
    if (!currentUser || !loginUser) {
      return;
    }

    const newChatId =
      currentUser._id > loginUser._id
        ? currentUser._id + loginUser._id
        : loginUser._id + currentUser._id;

    dispatch(setChatId(newChatId));
    console.log("chatId from Chat withseller component", newChatId);
    const unsubscribe = getMessagesForChat(
      newChatId,
      currentUser._id,
      loginUser._id,
      (messages) => {
        dispatch(setMessages(messages));
      }
    );

    navigate(`/chat/${newChatId}`);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        position="absolute"
        right="0px"
        onClick={handleChatWithSeller}
      >
        <Typography sx={{ fontSize: "12px" }}>Chat with Seller</Typography>
      </Button>
    </div>
  );
};

export default ChatWithSellerButton;
