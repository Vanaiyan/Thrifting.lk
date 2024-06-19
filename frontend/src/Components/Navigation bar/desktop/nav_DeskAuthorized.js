import React, { useState } from "react";
import {
  NavContainer,
  NavList,
  NavTitle,
  NavListItemText,
  SearchContainer,
  SearchInput,
  ButtonContainer,
  SignUpButton,
} from "../../../Styles/NavBar/nav01";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Actions/userAction"; // Adjust the path as needed

export const NavDesktopAuthorized = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemCount = useSelector((state) => state.cart.cartItemCount);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      handleMenuClose();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ padding: { md: "0 2vw", lg: "0 7vw" } }}
    >
      <Grid item md={2.7} lg={3}>
        <NavTitle sx={{ color: "#ff5003" }}>Thrifting.lk</NavTitle>
        <Divider orientation="vertical" flexItem />
      </Grid>

      <Grid
        item
        md={4.3}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <NavList type="row">
          <NavLink to="/" exact activeClassName="active">
            <NavListItemText>Home</NavListItemText>
          </NavLink>
          <NavLink to="/seller" exact activeClassName="active">
            <NavListItemText>SELL</NavListItemText>
          </NavLink>
          <NavListItemText>CATEGORIES</NavListItemText>
          <NavListItemText>ABOUT</NavListItemText>
        </NavList>
      </Grid>

      <Grid
        item
        md={2}
        lg={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </SearchContainer>
      </Grid>

      <Grid
        item
        lg={3}
        md={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            color: "black",
            width: "40px",
            height: "40px",
          }}
          onClick={() => handleNavigate("/wishlist")}
        >
          <FavoriteBorder sx={{ fontSize: "24px" }} />
        </IconButton>

        <IconButton
          sx={{ color: "black", width: "40px", height: "40px" }}
          onClick={() => handleNavigate("/cart")}
        >
          <Badge badgeContent={cartItemCount} color="primary">
            <ShoppingCartOutlinedIcon sx={{ fontSize: "24px" }} />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: "black", width: "40px", height: "40px" }}
          onClick={handleMenuOpen}
        >
          <AccountCircleOutlinedIcon sx={{ width: "26px", height: "26px" }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem sx={{ paddingY: 0, paddingX: 5 }} onClick={handleLogout}>
            My Profile
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{ paddingY: 0, paddingX: 5 }}
            onClick={() => {
              handleNavigate("/orders");
              handleMenuClose();
            }}
          >
            My Orders
          </MenuItem>
          <Divider />
          <MenuItem sx={{ paddingY: 0, paddingX: 5 }} onClick={handleMenuClose}>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem sx={{ paddingY: 0, paddingX: 5 }} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};
