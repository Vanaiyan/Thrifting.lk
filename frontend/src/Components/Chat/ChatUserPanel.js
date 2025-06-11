import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import ChatUser from "./ChatUser";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Reducers/userSlice";
import { setkeyword } from "../../Reducers/messageSlice";

const ChatUserPanel = ({ users }) => {
  const [loading, setLoading] = useState(true);
  const { unreadMessages } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users && users.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [users]);

  useEffect(() => {
    console.log("New message notify");
  }, [unreadMessages]);

  const handleUserClick = (user) => {
    dispatch(setCurrentUser(user));
    dispatch(setkeyword(""));
  };

  // Filter out undefined objects from the users array
  const filteredUsers = users.filter((user) => user !== undefined);

  return (
    <Box width={"100%"}>
      {loading ? (
        <CircularProgress />
      ) : (
        filteredUsers.map((user) => (
          <ChatUser
            key={user._id}
            user={user}
            onClick={() => handleUserClick(user)}
            unreadCount={unreadMessages[user._id] || 0}
          />
        ))
      )}
    </Box>
  );
};

export default ChatUserPanel;
