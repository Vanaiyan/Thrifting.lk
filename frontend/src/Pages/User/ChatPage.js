import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavChat from "../../Components/Chat/Navchat";
import ChatUserPanel from "../../Components/Chat/ChatUserPanel";
import { getUsers } from "../../Actions/chatActions";
import { getUserProfile } from "../../Actions/chatActions";
import ChatSearch from "../../Components/Chat/ChatSearch";
import MessageField from "../../Components/Chat/MessageField";
import { setCurrentUser, setLoginUser } from "../../Reducers/userSlice";
import { getSortedUsers } from "../../Actions/chatFirebase";
import { Colors } from "../../Styles/Theme";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loginUser, currentUser } = useSelector((state) => state.user);
  const { keyword, chatId } = useSelector((state) => state.messages);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const { userPRender } = useSelector((state) => state.messages);

  const fetchSortedUsers = async () => {
    try {
      if (users.length > 0 && usersLoaded) {
        console.log("all user list: ", users);
        const sortedUserIds = await getSortedUsers(user._id);
        console.log("Sorted Users:", sortedUserIds);
        const sortedUserObjects = sortedUserIds.map((userId) =>
          users.find((user) => user._id === userId)
        );
        setSortedUsers(sortedUserObjects);
        console.log("Sorted User Objects:", sortedUserObjects);
      }
    } catch (error) {
      console.error("Error fetching sorted users:", error);
    }
  };

  const fetchData = async () => {
    try {
      const usersList = await getUsers(keyword);
      if (usersList.success) {
        setUsers(usersList.users);
        console.log("All users list", usersList.users);
      } else {
        console.log("Error:", usersList?.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      if (userProfile) {
        dispatch(setLoginUser(userProfile.user));
        console.log("login user", userProfile.user);
        setLoading(false);
      } else {
        console.log("Error:", userProfile?.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setUsersLoaded(true);
    }
  }, [users]);

  useEffect(() => {
    fetchSortedUsers();
  }, [usersLoaded, users, userPRender, user]);

  useEffect(() => {
    if (chatId) {
      navigate(`/chat/${chatId}`);
    }
  }, [chatId]);

  return (
    <div>
      <NavChat />
      <Grid
        container
        width={"100%"}
        sx={{
          padding: "10px",
          gap: "10px",
          backgroundColor: "aliceblue",
        }}
      >
        <Grid
          item
          lg={3}
          md={4}
          sm={5}
          xs={12}
          sx={{
            // margin: "10px",
            borderRadius: "20px ",
            backgroundColor: Colors.chatdark,
          }}
        >
          <ChatSearch />
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "75vh",
              "&::-webkit-scrollbar": {
                width: "0.5em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            <ChatUserPanel users={keyword ? users : sortedUsers} />
          </Box>
        </Grid>

        <Grid item lg md sm xs>
          <MessageField />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatPage;
