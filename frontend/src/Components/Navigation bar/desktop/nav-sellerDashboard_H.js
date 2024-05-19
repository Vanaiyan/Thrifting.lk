import React, { useState, useEffect } from "react";
import { NavSubTitle, NavTitle } from "../../../Styles/NavBar/nav01";
import { Divider, Grid, Box, Typography, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import ProfileDialogBox from "../../SellerDashboard/Profile/ProfileDialogBox";
import axios from "axios";

const NavSellerDashboard_H = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [seller, setSeller] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile");
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

  const handleProfileOpen = () => {
    setOpen(true);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ padding: { md: "0 2vw", lg: "2vw 11vw" } }}
    >
      <Grid item md={6} lg={10}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavTitle sx={{ color: "#ff5003", mr: 1 }}>Thrifting.lk</NavTitle>
          <Divider orientation="vertical" flexItem />
        </Box>
      </Grid>
      <Grid item md={6} lg={2} textAlign={"right"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>
          <Typography>{seller?.firstName || "Guest"}</Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileOpen}>
              <PersonRoundedIcon />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          <ProfileDialogBox open={open} setOpen={setOpen} seller={seller} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default NavSellerDashboard_H;
