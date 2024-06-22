import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Typography } from "@mui/material";
import { setChatId, setMessages } from "../../Reducers/messageSlice";
import { setUnreadMessages } from "../../Reducers/userSlice";
import { getMessagesForChat } from "../../Actions/chatFirebase";
import { ChTitle } from "./ChTitle";
import ChatInput from "./ChatInput";
import { MsgReceiver } from "./MsgReceiver";
import { MsgSender } from "./MsgSender";
import ChatUserPanel from "./ChatUserPanel";
import { Colors } from "../../Styles/Theme";

// Component for Title of Receiver, Input field and showing messages
const MessageField = () => {
  const dispatch = useDispatch();
  const { messages, chatId } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { loginUser, currentUser, unreadMessages } = useSelector(
    (state) => state.user
  );
  const [render, setRender] = useState(0);

  const onSend = () => {
    setRender(render + 1);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp); // Create a Date object from the milliseconds
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  let prevDate = null;

  const handleNewMessage = (message) => {
    const { senderId } = message;
    console.log("test100");
    dispatch(setUnreadMessages({ userId: senderId, count: 1 }));
    dispatch(setMessages([...messages, message]));
  };

  useEffect(() => {
    console.log("asdfgh");
    if (!currentUser || !user) {
      return;
    }

    const newChatId =
      currentUser._id > user._id
        ? currentUser._id + user._id
        : user._id + currentUser._id;
    console.log("ssss");
    console.log("Current user to get msg : ", currentUser._id);
    console.log("login user  to get msg : ", user._id);
    console.log("ChatID user  to get msg : ", newChatId);
    dispatch(setChatId(newChatId));

    const unsubscribe = getMessagesForChat(
      newChatId,
      currentUser._id,
      user._id,
      (messages) => {
        console.log("test200");
        dispatch(setMessages(messages));
      },
      handleNewMessage
    );

    return () => {
      if (unsubscribe) {
        // unsubscribe();
      }
    };
  }, [currentUser, loginUser, user, dispatch]);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "10px",
        borderRadius: "25px",
        backgroundColor: "white",
        height: "85vh",
        border: "1px solid ",
        display: "block",
        alignItems: "flex-end",
        borderColor: Colors.chatdark,
      }}
    >
      <ChTitle userFirstName={currentUser.firstName} />
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          bottom: "62px",
          left: 0,
          right: 0,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
        ref={(el) => {
          el && (el.scrollTop = el.scrollHeight);
        }}
      >
        {messages.map((message) => {
          const currentDate = formatDate(message.timestamp);
          const shouldPrintDate = currentDate !== prevDate;
          prevDate = currentDate;

          return (
            <div key={message.id}>
              {shouldPrintDate && (
                <Typography
                  variant="chat2"
                  color={Colors.org1}
                  m={2}
                  sx={{
                    marginLeft: "40%",
                    backgroundColor: Colors.org5,
                    boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {currentDate}
                </Typography>
              )}

              {message.senderId === user._id ? (
                <MsgSender key={message.id} message={message} />
              ) : (
                <MsgReceiver key={message.id} message={message} />
              )}
            </div>
          );
        })}
      </Box>
      <ChatInput onSend={onSend} />
    </Paper>
  );
};

export default MessageField;
