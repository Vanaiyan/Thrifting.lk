import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  alpha,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const WhiteSearchContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(2),
  padding: theme.spacing(0.5, 1),
  display: "flex",
  alignItems: "center",
}));

const WhiteSearchInput = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
}));

export const NavMobile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Menu button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "'Dela Gothic One', sans-serif" }}
        >
          Thrifting.lk
        </Typography>

        {/* White Search Bar */}
        <WhiteSearchContainer sx={{ marginRight: "20px" }}>
          <SearchIcon sx={{ color: "black" }} />
          <WhiteSearchInput placeholder="Search…" />
        </WhiteSearchContainer>

        {/* Avatar for profile */}
        <Avatar
          src="/path/to/avatar-image.jpg"
          alt="Avatar"
          sx={{ cursor: "pointer" }}
        />

        {/* Menu Dropdown */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Home</MenuItem>
          <MenuItem onClick={handleClose}>Sell</MenuItem>
          <MenuItem onClick={handleClose}>Categories</MenuItem>
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
