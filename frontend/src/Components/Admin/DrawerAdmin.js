import React from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import logout icon
import { useNavigate } from "react-router-dom";
import { NavTitle } from "../../Styles/NavBar/nav01";

const DrawerAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("userRole");

    navigate("/admin/login");
  };

  return (
    <Drawer
      sx={{
        width: "calc(100vw / 6)",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "calc(100vw / 6)",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box>
        {/* <img
          width={"50%"}
          src={logo}
          style={{ marginLeft: "40px", marginTop: "20px" }}
          alt="Logo"
        /> */}
      </Box>
      <NavTitle sx={{ color: "#ff5003", m: "15px" }}>Thrifting.lk</NavTitle>
      <List>
        {[
          { text: "All Products", icon: <StoreIcon />, path: "/admin/allproducts" },
          { text: "Sellers", icon: <PeopleIcon />, path: "/admin/Sellers" },
          { text: "Order List", icon: <ListAltIcon />, path: "/admin/OrderList" },
          { text: "Seller Approval", icon: <VerifiedUserIcon />, path: "/admin/SellerApproval" },
          { text: "Report Feedback", icon: <ReportIcon />, path: "/admin/Report feedback" },
        ].map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: location.pathname === item.path ? '#ff5003' : 'inherit',
            }}
          >
            <ListItemIcon style={{ color: location.pathname === item.path ? '#ff5003' : 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem onClick={handleLogout} style={{ mt: "20px" }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerAdmin;
