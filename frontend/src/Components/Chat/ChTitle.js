import { Box, Typography, Avatar, Divider, Paper } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

export const ChTitle = ({ userFirstName, profilePicture, role }) => {
  // console.log("Message entered tit:", userFirstName);

  return (
    <Box
      // width="100%"
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.4)",
        padding: " 5px 20px",
        backgroundColor: Colors.chatdark,
      }}
    >
      <Avatar
        src={profilePicture}
        alt="Avatar"
        sx={{
          cursor: "pointer",
          border: "2px solid",
          borderColor: Colors.orgchat,
        }}
      />
      <Box margin={"15px 20px"}>
        <Typography fontSize={14} fontWeight={600} color={Colors.orgchat}>
          {userFirstName}
        </Typography>
        <Typography fontSize={12} color={Colors.orgchatsub}>
          Registered {role}
        </Typography>
      </Box>
    </Box>
  );
};
