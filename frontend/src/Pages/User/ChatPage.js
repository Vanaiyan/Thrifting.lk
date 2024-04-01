import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import NavChat from "../../Components/Chat/Navchat";
import ChatUserPanel from "../../Components/Chat/ChatUserPanel";
import { getUsers } from "../../Actions/chatActions";
import { getUserProfile } from "../../Actions/chatActions";
import ChatSearch from "../../Components/Chat/ChatSearch";
import MessageField from "../../Components/Chat/MessageField";
import ChLoginUser from "../../Components/Chat/ChLoginUser";
import { setCurrentUser, setLoginUser } from "../../Reducers/userSlice";
import { getSortedUsers } from "../../Actions/chatFirebase";
import { Colors } from "../../Styles/Theme";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { loginUser, currentUser } = useSelector((state) => state.user);
  const { keyword } = useSelector((state) => state.messages);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const { userPRender } = useSelector((state) => state.messages);

  const fetchSortedUsers = async () => {
    try {
      if (users.length > 0 && usersLoaded) {
        // Ensure users array is not empty
        console.log("all user list: ", users);
        const sortedUserIds = await getSortedUsers();
        console.log("Sorted Users:", sortedUserIds);
        // Sort users based on the order of sortedUserIds
        const sortedUserObjects = sortedUserIds.map((userId) =>
          users.find((user) => user._id === userId)
        );
        setSortedUsers(sortedUserObjects);

        // Handle the sortedUserObjects as needed
        console.log("Sorted User Objects:", sortedUserObjects);
      }
    } catch (error) {
      console.error("Error fetching sorted users:", error);
      // Handle the error appropriately
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
  }, [users]); // Update usersLoaded when users data is loaded

  useEffect(() => {
    fetchSortedUsers();
  }, [usersLoaded, users, userPRender]); // Fetch sorted users when users data is loaded or updated

  return (
    <div>
      <NavChat />
      <Grid
        container
        width={"100%"}
        sx={{
          padding: "0px 20px 0 0",
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
            borderRadius: "20px ",
            margin: "10px",
            backgroundColor: Colors.chatdark,
          }}
        >
          {/* {loading ? <p>Loading...</p> : <ChLoginUser />} */}
          <ChatSearch />
          <Box
            sx={{
              overflowY: "auto", // Add this line to make the container scrollable
              maxHeight: "75vh",
              "&::-webkit-scrollbar": {
                width: "0.5em", // Set the width of the scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Set the color of the scrollbar thumb
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
