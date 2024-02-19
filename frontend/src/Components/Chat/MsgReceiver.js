import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

export const MsgReceiver = ({ paragraph }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "10px",
        border: "2px solid ",
        borderColor: Colors.org2,
        color: Colors.org1,
        textAlign: "justify",
        margin: "10px",
        width: { lg: "30vw", md: "40vw", sm: "50vw", xs: "60vw" },
      }}
    >
      <Typography variant="chat1">
        {paragraph}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the
      </Typography>
    </Box>
  );
};
