import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton, Typography, Avatar, Paper } from "@mui/material";
import { Colors } from "../../Styles/Theme"; // Import your color theme
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserProfileView = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="User Profile Picture"
            src={user.profilePicture}
            sx={{
              width: 120,
              height: 120,
              marginBottom: "10px",
              border: `4px solid ${Colors.chatdark}`, // Use your color for the border
            }}
          />
          <Typography
            variant="h5"
            fontWeight={600}
            color={Colors.chatd}
            sx={{ textAlign: "center" }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle2" color={Colors.dimgrey}>
            {user.email}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600}>
            Contact Information
          </Typography>
          <Typography variant="subtitle2" color={Colors.dimgrey}>
            {user.contactNumber || "077 11 22 356"}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600}>
            Address
          </Typography>
          <Typography variant="subtitle2" color={Colors.dimgrey}>
            {user.address || "Kattubedda, Morattuwa"}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600}>
            Short Bio
          </Typography>
          <Typography variant="subtitle2" color={Colors.dimgrey}>
            {user.bio || "No bio available"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ ml: "auto" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default UserProfileView;
