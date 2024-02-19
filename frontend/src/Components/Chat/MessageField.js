import React from "react";
import { ChTitle } from "./ChTitle";
import ChatInput from "./ChatInput";
import { Paper, Box } from "@mui/material";
import { Colors } from "../../Styles/Theme";
import { MsgSender } from "./MsgSender";

export const MessageField = ({ user }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: "10px",
        margin: "10px",
        height: "85vh",
        borderRadius: "10px",
        border: "2px solid ",
        display: "block",
        alignItems: "flex-end",
        borderColor: Colors.org4,
      }}
    >
      <ChTitle userFirstName={user.firstName} />
      <Box sx={{ overflowY: "scroll" }}>
        <MsgSender />
      </Box>
      <ChatInput />
    </Paper>
  );
};
