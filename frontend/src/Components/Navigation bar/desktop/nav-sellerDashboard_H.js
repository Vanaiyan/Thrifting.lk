import React, { useState, useEffect } from "react";
import { NavTitle } from "../../../Styles/NavBar/nav01";
import { Divider, Grid, Box, Typography, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavSellerDashboard_H = ({ sellerId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${sellerId}`
        );

        setSeller(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddAccount = () => {
    handleMenuClose();
    navigate("/seller/register");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/");
  };
  const isMenuOpen = Boolean(anchorEl);
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ padding: { md: "0 2vw", lg: "2vw 11vw" } }}
    >
      <Grid item md={11} lg={11} xs={11}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavTitle sx={{ color: "#ff5003", mr: 1 }}>Thrifting.lk</NavTitle>
          <Divider orientation="vertical" flexItem />
        </Box>
      </Grid>
      <Grid item md={1} lg={1} xs={1} textAlign={"right"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar />
          <IconButton onClick={handleMenuOpen}>
            <ArrowDropDownIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Avatar />
              <Typography sx={{ ml: 1 }}>
                {isMenuOpen ? seller?.firstName || "Guest" : ""}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAddAccount}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NavSellerDashboard_H;
