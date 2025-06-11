import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

const ChatUser = ({ firstName, lastName, onClick }) => {
  return (
    <Box
      onClick={onClick}
      width={"280px"}
      height={"60px"}
      sx={{
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        margin: "10px",
        backgroundColor: Colors.org6,
        transition: "0.3s",
        "&:hover": { backgroundColor: Colors.org5 },
        "&:active": {
          border: "2px solid ",
          borderColor: Colors.org2,
          boxShadow: "0px 0px 8px rgba(255, 136, 65, 0.5)",
        },
      }}
    >
      <Avatar
        src="/path/to/avatar-image.jpg"
        alt="Avatar"
        sx={{ cursor: "pointer" }}
      />
      <Box margin={"15px 20px"}>
        <Typography fontSize={14} fontWeight={600}>
          {firstName}
        </Typography>
        <Typography fontSize={12} color={Colors.dimgrey}>
          Registered Seller
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatUser;
