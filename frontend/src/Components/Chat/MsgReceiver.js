import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../../Styles/Theme";

export const TimeprintReceier = ({ message }) => {
  return (
    <Typography
      variant="chat2"
      sx={{ position: "absolute", bottom: "-11px", left: 2 }}
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
export const MsgReceiver = ({ message }) => {
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
            margin: "10px",
            backgroundColor: "rgba(36, 30, 49, 0.4)",
            borderRadius: "5px",
            width: "fit-content",
            padding: "3px",
          }}
        >
          <img src={message.imageUrl} alt="Attached" height="200vw" />
          <TimeprintReceier message={message} />
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          color: "#000",
          display: "flex",
          alignItems: "center",
          margin: "15px",
          padding: " 10px 40px 10px 10px",
          backgroundColor: "rgba(36, 30, 49, 0.4)",
          borderRadius: " 5px 25px 25px 25px",
          width: "fit-content",
          textAlign: "justify",
          maxWidth: { lg: "30vw", md: "40vw", sm: "50vw", xs: "60vw" },
        }}
      >
        {message.text !== null &&
          message.text.trim() !== " " &&
          renderMessageText(message.text)}
        <TimeprintReceier
          message={message}
          sx={{ position: "absolute", left: 0 }}
        />
      </Box>
    </Box>
  );
};
