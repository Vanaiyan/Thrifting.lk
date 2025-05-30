// SearchBar.js
import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { setkeyword } from "../../Reducers/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../Styles/Theme";
const ChatSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    {
      dispatch(setkeyword(event.target.value));
    }
  };
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      onChange={handleSearch}
      sx={{
        width: "93%", // Set width to 100% to fill its container
        margin: "10px",
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused": {
            "& > fieldset": {
              borderWidth: "1px",
              borderColor: Colors.primary, // border color when focused
            },
          },
          "& > fieldset": {
            borderColor: Colors.orgchat,
            borderRadius: "20px",
          },
          "&:hover": {
            "& > fieldset": {
              borderColor: Colors.primary, // Border color on hover
            },
          },
          "& input": {
            fontWeight: "200",
            color: Colors.orgchat, // Text color
          },
          "& input::placeholder": {
            color: Colors.orgchat, // placeholder color
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <IconButton sx={{ color: Colors.orgchat }}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatSearch;
