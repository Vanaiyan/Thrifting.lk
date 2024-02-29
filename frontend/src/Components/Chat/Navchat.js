import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Colors } from "../../Styles/Theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChLoginUser from "./ChLoginUser";
const NavChat = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "aliceblue",
        boxShadow: "none",
        borderRadius: "20px",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: Colors.chatdark,
          borderRadius: "20px",
          margin: " 10px 10px 0 10px ",
          boxShadow: "rgba(149, 157, 165, 0.4) 0px 8px 24px",
        }}
      >
        <Typography
          // variant={{ lg: "h5", md: "h6", sm: "h6" }}
          component="div"
          sx={{
            flexGrow: 1,
            color: Colors.org1,
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: { lg: "24px", md: "20px", sm: "20px" },
          }}
        >
          Thrifting.lk{" "}
        </Typography>
        <ChLoginUser />

        {/* <IconButton
          size="large"
          aria-controls="simple-menu"
          aria-haspopup="true"
          // onClick={handleClick}
          sx={{ color: Colors.org1 }}
        >
          <MoreVertIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavChat;
