// LoginPromptModal.js
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const LoginPromptModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          You need to be logged in to use this feature.
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginPromptModal;
