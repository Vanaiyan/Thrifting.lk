import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { Colors } from "../../Styles/Theme"; // Import your color theme
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserProfileView = ({ user }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    if (user.role === "Seller") {
      setOpen(!open); // Toggle open state only if user role is "Seller"
    }
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer}>
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
            {user.phoneNumber || "077 11 22 356"}
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600}>
            Address
          </Typography>
          <Typography variant="subtitle2" color={Colors.dimgrey}>
            {user.addressField
              ? user.addressField.address +
                " " +
                user.addressField.city +
                " " +
                user.addressField.district
              : "Kattubedda, Morattuwa"}
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
      <Avatar
        src={user.profilePicture}
        alt="Avatar"
        onClick={toggleDrawer}
        sx={{
          cursor: "pointer",
          border: "2px solid",
          borderColor: Colors.orgchat,
        }}
      />
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default UserProfileView;
