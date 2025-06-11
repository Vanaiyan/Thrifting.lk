import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Colors } from "../../Styles/Theme";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../firebase";

const ChatInput = () => {
  const [message, setMessage] = useState(""); // State to track the input message

  const db = getFirestore(app);

  const addMessage = async (message) => {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: now,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSend = () => {
    console.log("Message saved in firebase :", message);
    addMessage(message);
    setMessage("");
  };

  return (
    <Paper
      elevation="1"
      component="form"
      sx={{
        margin: "10px",
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: Colors.org4,
        borderRadius: "4px",
        padding: "8px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message..."
        inputProps={{ "aria-label": "Type your message" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update the message state on input change
      />
      <IconButton
        type="button"
        onClick={handleSend}
        aria-label="send"
        color="primary"
      >
        <SendIcon />
      </IconButton>
      <IconButton color="primary" aria-label="attach file">
        <AttachFileIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
