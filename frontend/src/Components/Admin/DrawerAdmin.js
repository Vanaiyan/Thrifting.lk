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
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { NavTitle } from "../../Styles/NavBar/nav01";
import { logoutUser } from "../../Actions/userAction";
import { useDispatch } from "react-redux";

const DrawerAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("userRole");
    dispatch(logoutUser());
    navigate("/admin/login");
  };

  return (
    <Drawer
      sx={{
        width: "240px", // Default width
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px", // Default width
          boxSizing: "border-box",
          backgroundColor: "#000033", // Dark blue background color
        },
        "@media (max-width: 960px)": {
          width: "180px", // Adjusted width for smaller screens
          "& .MuiDrawer-paper": {
            width: "180px", // Adjusted width for smaller screens
          },
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
      <NavTitle 
        component={NavLink}
        to="/"
        sx={{ 
          color: "#ff5003", 
          m: "15px",
          textDecoration: "none" // Ensure the text has no underline
        }}
      >
        Thrifting.lk
      </NavTitle>
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/Dashboard" },
          { text: "All Products", icon: <StoreIcon />, path: "/admin/AllProducts" },
          { text: "Sellers", icon: <PeopleIcon />, path: "/admin/Sellers" },
          { text: "Buyers", icon: <PeopleIcon />, path: "/admin/Buyers" },
          { text: "Order List", icon: <ListAltIcon />, path: "/admin/OrderList" },
          { text: "Seller Approval", icon: <VerifiedUserIcon />, path: "/admin/SellerApproval" },
          { text: "Report Feedback", icon: <ReportIcon />, path: "/admin/ReportFeedback" },
        ].map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: location.pathname === item.path ? "#ff5003" : "white", // Changed to white
            }}
          >
            <ListItemIcon
              style={{
                color: location.pathname === item.path ? "#ff5003" : "white", // Changed to white
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'inherit' }} /> {/* Added sx prop to inherit color */}
          </ListItem>
        ))}
        <ListItem 
          onClick={handleLogout} 
          style={{ mt: "20px", color: 'white' }} // Changed color to white
          sx={{
            cursor: "pointer", // Change cursor to pointer on hover
            // "&:hover": {
            //   backgroundColor: "#ff5003", // Change background color on hover
            //   color: "white", // Change text color on hover
            // },
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon style={{ color: 'white' }} /> {/* Changed color to white */}
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: 'inherit' }} /> {/* Added sx prop to inherit color */}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerAdmin;




// // src/Components/Admin/DrawerAdmin.js
// import React from "react";
// import {
//   Drawer,
//   List,
//   Box,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { NavLink, useLocation } from "react-router-dom";
// import StoreIcon from '@mui/icons-material/Store';
// import PeopleIcon from '@mui/icons-material/People';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import ReportIcon from '@mui/icons-material/Report';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { useNavigate } from "react-router-dom";
// import { NavTitle } from "../../Styles/NavBar/nav01";
// import { logout } from "../../Reducers/authSlice";
// import { useDispatch } from "react-redux";

// const DrawerAdmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     dispatch(logout());
//     navigate("/admin/login");
//   };

//   return (
//     <Drawer
//       sx={{
//         width: "240px", // Default width
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: "240px", // Default width
//           boxSizing: "border-box",
//           backgroundColor: "#000033", // Dark blue background color
//         },
//         "@media (max-width: 960px)": {
//           width: "180px", // Adjusted width for smaller screens
//           "& .MuiDrawer-paper": {
//             width: "180px", // Adjusted width for smaller screens
//           },
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Box>
//         {/* <img
//           width={"50%"}
//           src={logo}
//           style={{ marginLeft: "40px", marginTop: "20px" }}
//           alt="Logo"
//         /> */}
//       </Box>
//       <NavTitle sx={{ color: "#ff5003", m: "15px" }}>Thrifting.lk</NavTitle>
//       <List>
//         {[
//           { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/Dashboard" },
//           { text: "All Products", icon: <StoreIcon />, path: "/admin/AllProducts" },
//           { text: "Sellers", icon: <PeopleIcon />, path: "/admin/Sellers" },
//           { text: "Buyers", icon: <PeopleIcon />, path: "/admin/Buyers" },
//           { text: "Order List", icon: <ListAltIcon />, path: "/admin/OrderList" },
//           { text: "Seller Approval", icon: <VerifiedUserIcon />, path: "/admin/SellerApproval" },
//           { text: "Report Feedback", icon: <ReportIcon />, path: "/admin/ReportFeedback" },
//         ].map((item, index) => (
//           <ListItem
//             key={index}
//             component={NavLink}
//             to={item.path}
//             style={{
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               color: location.pathname === item.path ? "#ff5003" : "white", // Changed to white
//             }}
//           >
//             <ListItemIcon
//               style={{
//                 color: location.pathname === item.path ? "#ff5003" : "white", // Changed to white
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.text} sx={{ color: 'inherit' }} /> {/* Added sx prop to inherit color */}
//           </ListItem>
//         ))}
//         <ListItem onClick={handleLogout} style={{ mt: "20px", color: 'white' }}> {/* Changed color to white */}
//           <ListItemIcon>
//             <ExitToAppIcon style={{ color: 'white' }} /> {/* Changed color to white */}
//           </ListItemIcon>
//           <ListItemText primary="Logout" sx={{ color: 'inherit' }} /> {/* Added sx prop to inherit color */}
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default DrawerAdmin;
