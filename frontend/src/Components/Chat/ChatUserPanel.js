import { Box, Paper } from "@material-ui/core";
import ChatUser from "./ChatUser";
import { Colors } from "../../Styles/Theme";

const ChatUserPanel = ({ users, setCurrentUser }) => {
  const handleUserClick = (user) => {
    setCurrentUser(user);
  };

  return (
    <Box>
      {users.map((user) => (
        <ChatUser
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          onClick={() => handleUserClick(user)}
        />
      ))}
    </Box>
  );
};

export default ChatUserPanel;
