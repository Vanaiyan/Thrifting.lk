import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Colors } from "../../Styles/Theme";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ChLoginUser from "./ChLoginUser";

const NavChat = () => {
  const { user } = useSelector((state) => state.auth);

  // Determine the background color based on user role
  const backgroundColor =
    user.role === "Seller" ? Colors.chatdark : Colors.org1;

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
          backgroundColor,
          borderRadius: "20px",
          margin: " 10px 10px 0 10px ",
          boxShadow: "rgba(149, 157, 165, 0.4) 0px 8px 24px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "15px",
            color: "white",
          }}
        >
          {" "}
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                color: "white", // Ensure Colors.org1 is defined or use a valid color string
                fontFamily: "'Dela Gothic One', sans-serif",
                fontSize: { lg: "24px", md: "20px", sm: "20px" },
              }}
            >
              Thrifting.lk
            </Typography>
          </NavLink>
          <Typography fontSize={10}>
            {user.role === "Seller" ? "| SELLER" : ""}
          </Typography>
        </Box>
        <ChLoginUser />

        {/* Example of adding a menu icon */}
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
