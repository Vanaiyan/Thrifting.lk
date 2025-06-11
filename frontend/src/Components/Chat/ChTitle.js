import { Box, Typography, Avatar, Divider, Paper } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

export const ChTitle = ({ userFirstName }) => {
  console.log("Message entered tit:", userFirstName);

  return (
    <Box
      margin={"10px"}
      width={"65vw"}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: Colors.org6,
      }}
    >
      <Avatar
        src="/path/to/avatar-image.jpg"
        alt="Avatar"
        sx={{ cursor: "pointer" }}
      />
      <Box margin={"15px 20px"}>
        <Typography fontSize={14} fontWeight={600}>
          {userFirstName}
        </Typography>
        <Typography fontSize={12} color={Colors.dimgrey}>
          Registered Seller
        </Typography>
      </Box>
    </Box>
  );
};
