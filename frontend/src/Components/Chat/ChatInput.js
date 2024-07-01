import React, { useState } from "react";
import { Paper, Box, InputBase, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Colors } from "../../Styles/Theme";
import { useSelector, useDispatch } from "react-redux";
import { incrementUserPRender } from "../../Reducers/messageSlice";
import { addMessageToChat } from "../../Actions/chatFirebase";
import { uploadImage } from "../../Actions/chatFirebase"; // Import the function to handle image upload

const ChatInput = ({ onSend }) => {
  const dispatch = useDispatch();
  const { chatId } = useSelector((state) => state.messages);
  const { loginUser, currentuser } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const { user } = useSelector((state) => state.auth);

  const handleSend = async () => {
    // Check if the newMessage and selectedFile are not empty
    if (newMessage.trim() === "" && !selectedFile) {
      return;
    }
    // If there's a selected file, upload the image and get the URL
    let imageUrl = null;
    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    try {
      // Send the message to the chat
      await addMessageToChat(chatId, user._id, newMessage, imageUrl);

      // Clear the input fields
      setNewMessage("");
      setSelectedFile(null);
      setImagePreview(null); // Clear image preview

      // Increment userPRender to trigger a re-render
      dispatch(incrementUserPRender());

      // Notify the parent component if needed
      onSend();
    } catch (error) {
      console.error("Error adding message to chat:", error);
      // Handle the error appropriately
    }
  };

  const handleFileChange = (event) => {
    // Handle file selection
    const file = event.target.files[0];
    setSelectedFile(file);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Paper
      variant="0"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: " 5px 10px",
        borderRadius: "20px",
        borderColor: Colors.org1,
        border: "1px",
        backgroundColor: "rgba(0,0,0,0.1)",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Image preview */}
      {imagePreview && (
        <Avatar
          alt="Image Preview"
          src={imagePreview}
          sx={{ width: 60, height: 60, marginBottom: 1 }}
        />
      )}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message..."
        inputProps={{ "aria-label": "Type your message" }}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Check if the "Enter" key is pressed
            e.preventDefault(); // Prevent the default behavior of Enter (which adds a new line)
            handleSend(); // Call the handleSend function when Enter is pressed
          }
        }}
      />

      <input
        type="file"
        id="image-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box>
        <label htmlFor="image-input">
          <IconButton component="span" color="primary" aria-label="attach file">
            <AttachFileIcon />
          </IconButton>
        </label>
        <IconButton
          type="button"
          onClick={handleSend}
          aria-label="send"
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatInput;
