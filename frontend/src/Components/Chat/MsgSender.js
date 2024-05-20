import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

export const TimeprintSender = ({ message }) => {
  return (
    <Typography
      variant="chat2"
      sx={{ position: "absolute", bottom: "-11px", right: 2 }}
    >
      {message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : ""}
    </Typography>
  );
};

export const MsgSender = ({ message }) => {
  const renderMessageText = (text) => {
    const lines = text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line.includes("**") ? (
          <>
            {line.split("**")[0]}
            <strong style={{ fontSize: "14px", textDecoration: "underline" }}>
              {line.split("**")[1]}
            </strong>
            {line.split("**")[2]}
          </>
        ) : (
          line
        )}
        <br />
      </React.Fragment>
    ));
    return <Typography variant="chat1">{lines}</Typography>;
  };

  return (
    <Box>
      {message.imageUrl && (
        <Box
          sx={{
            position: "relative",
            margin: "15px",
            backgroundColor: Colors.org1,
            borderRadius: "5px",
            width: "fit-content",
            padding: "3px",
            marginLeft: "auto", // Align the box to the right
          }}
        >
          <img src={message.imageUrl} alt="Attached" height="200vw" />
          <TimeprintSender message={message} />
        </Box>
      )}
      <Box
        sx={{
          color: "#ffff",
          display: "flex",
          position: "relative",
          alignItems: "center",
          margin: "15px",
          padding: "10px 40px 10px 10px",
          backgroundColor: Colors.org1,
          borderRadius: "25px 5px 25px 25px",
          width: "fit-content", // Set the width to fit-content
          textAlign: "justify",
          marginLeft: "auto", // Align the box to the right
          maxWidth: { lg: "30vw", md: "40vw", sm: "50vw", xs: "60vw" },
        }}
      >
        {message.text !== null &&
          message.text.trim() !== "" &&
          renderMessageText(message.text)}

        <TimeprintSender message={message} />
      </Box>
    </Box>
  );
};
