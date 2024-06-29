import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box, IconButton, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import NotificationsIcon from '@mui/icons-material/Notifications';

const AppBarAdmin = ({ adminName, adminAvatar }) => {
  const { user } = useSelector((state) => state.auth);

  // Dummy notification count for demonstration
  const notificationCount = 3; // Replace with actual notification count logic

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" color="black" sx={{ ml: "250px" }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" sx={{ color: "#f44336", marginRight: "10px" }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon sx={{ color: '#9e9e9e' }} />
            </Badge>
          </IconButton>

          <Avatar alt={adminName} src={adminAvatar} sx={{ width: 32, height: 32 }} />

          <Typography variant="subtitle2" sx={{ ml: "10px", color: "black", marginRight: "10px" }}>
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarAdmin;
