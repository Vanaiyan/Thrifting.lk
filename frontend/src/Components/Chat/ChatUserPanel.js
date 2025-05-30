import { Box } from "@material-ui/core";
import ChatUser from "./ChatUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../Reducers/userSlice";

const ChatUserPanel = ({ users }) => {
  const { unreadMessages } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("New message notify");
  }, [unreadMessages]);

  const dispatch = useDispatch();
  const handleUserClick = (user) => {
    dispatch(setCurrentUser(user));
  };

  return (
    <Box width={"100%"}>
      {users.map((user) => (
        <ChatUser
          key={user._id}
          user={user}
          onClick={() => handleUserClick(user)}
          unreadCount={unreadMessages[user._id] || 0}
        />
      ))}
    </Box>
  );
};

export default ChatUserPanel;
