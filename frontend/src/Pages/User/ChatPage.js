import React, { useEffect, useState } from "react";
import NavChat from "../../Components/Chat/Navchat";
import { Grid } from "@mui/material";
import ChatUserPanel from "../../Components/Chat/ChatUserPanel";
import { getUsers } from "../../Actions/chatActions";
import ChatSearch from "../../Components/Chat/ChatSearch";
import { MessageField } from "../../Components/Chat/MessageField";
export const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const handleSearch = (value) => {
    setkeyword(value);
  };

  const fetchData = async () => {
    try {
      const usersList = await getUsers(keyword);
      if (usersList.success) {
        setUsers(usersList.users);
        console.log(usersList.users);
      } else {
        console.log("Error:", usersList?.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyword]); // Refetch data when search term changes

  return (
    <div>
      <NavChat />
      <Grid container>
        <Grid item>
          <ChatSearch onSearch={handleSearch} />
          <ChatUserPanel users={users} setCurrentUser={setCurrentUser} />
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {currentUser && <MessageField user={currentUser} />}
        </Grid>
      </Grid>
    </div>
  );
};
