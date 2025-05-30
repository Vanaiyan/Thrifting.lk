import React from "react";
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link to="/chat" style={{ textDecoration: "none" }}>
      <Fab
        color="primary"
        aria-label="chat"
        style={{
          position: "fixed",
          bottom: 16,
          right: 24,
        }}
      >
        <ChatIcon />
      </Fab>
    </Link>
  );
};

export default FloatingButton;
