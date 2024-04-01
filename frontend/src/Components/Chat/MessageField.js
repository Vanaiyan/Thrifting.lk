import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { Colors } from "../../Styles/Theme";
import { setChatId, setMessages } from "../../Reducers/messageSlice";
import { getMessagesForChat } from "../../Actions/chatFirebase";
import { ChTitle } from "./ChTitle";
import ChatInput from "./ChatInput";
import { MsgReceiver } from "./MsgReceiver";
import { MsgSender } from "./MsgSender";
const MessageField = () => {
  const dispatch = useDispatch();
  const { messages, chatId } = useSelector((state) => state.messages);
  const { loginUser, currentUser } = useSelector((state) => state.user);
  const [render, setRender] = useState(0);

  const onSend = () => {
    setRender(render + 1);
  };

  // Function to format date in a readable format
  const formatDate = (timestamp) => {
    return timestamp
      ? timestamp.toDate().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  };

  let prevDate = null; // Variable to keep track of the previous date

  useEffect(() => {
    if (!currentUser || !loginUser) {
      return; // Exit early if currentUser or loginUser is null or undefined
    }

    const newChatId =
      currentUser._id > loginUser._id
        ? currentUser._id + loginUser._id
        : loginUser._id + currentUser._id;

    dispatch(setChatId(newChatId));

    // Call getMessagesForChat with a callback function to handle the messages
    const unsubscribe = getMessagesForChat(
      newChatId,
      currentUser._id,
      (messages) => {
        // Update your component state with the messages
        dispatch(setMessages(messages));
      }
    );
    // Cleanup the listener when the component unmounts or when needed
    return;
  }, [currentUser, loginUser, render]); // Include loginUser and currentUser in the dependency array

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
          overflowY: "auto", // Add this line to make the container scrollable
          // maxHeight: "64vh", // Set the maximum height for scrolling
          "&::-webkit-scrollbar": {
            width: "0.5em", // Set the width of the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Set the color of the scrollbar thumb
          },
        }}
        ref={(el) => {
          // Scroll to the bottom when the component mounts
          el && (el.scrollTop = el.scrollHeight);
        }}
      >
        {messages.map((message) => {
          const currentDate = formatDate(message.timestamp);
          const shouldPrintDate = currentDate !== prevDate;
          prevDate = currentDate;

          return (
            <div key={message.id}>
              {/* To Print Date if date changes */}
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

              {/* To Print Messages and check sender or receiver */}
              {message.senderId === loginUser._id ? (
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
