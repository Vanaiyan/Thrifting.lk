import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Colors } from "../../Styles/Theme";
import { useSelector } from "react-redux";
import UserProfileView from "./UserProfileView";

const ChatUser = ({ user, onClick, unreadCount }) => {
  const { currentUser } = useSelector((state) => state.user);
  const activeColor = () => {
    if (currentUser && user._id === currentUser._id) {
      return Colors.org2;
    } else {
      return "transparent";
    }
  };

  useEffect(() => {
    // console.log(unreadCount);
  }, []);

  return (
    <div>
      <Box
        onClick={onClick}
        maxWidth={"100%"}
        height={"60px"}
        sx={{
          color: Colors.orgchat,
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: activeColor(),
          boxShadow: `0px 0px 8px ${activeColor()}`,
          margin: " 0 10px",
          transition: "0.3s",
          "&:hover": { backgroundColor: Colors.dimgrey },
        }}
      >
        <UserProfileView user={user} />
        <Box margin={"15px 20px"}>
          <Typography fontSize={14} fontWeight={600}>
            {user.firstName}
          </Typography>
          <Typography fontSize={12} color={Colors.orgchatsub}>
            Registered {user.role}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          marginLeft: "10%",
          width: "80%", // Set the desired width
          backgroundColor: Colors.orgchatsub, // Set the desired background color
        }}
      />
    </div>
  );
};

export default ChatUser;
