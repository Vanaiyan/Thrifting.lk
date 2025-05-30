import { Box } from "@material-ui/core";
import ChatUser from "./ChatUser";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Reducers/userSlice";

const ChatUserPanel = ({ users }) => {
  const dispatch = useDispatch();
  const handleUserClick = (user) => {
    dispatch(setCurrentUser(user));
  };

  return (
    <Box width={"100%"}>
      {users.map(
        (user) =>
          user._id && ( // Check if _id exists
            <ChatUser
              key={user._id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          )
      )}
    </Box>
  );
};

export default ChatUserPanel;
