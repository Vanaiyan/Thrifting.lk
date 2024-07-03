import React, { useState, useEffect } from "react";
import { NavList, NavListItemText } from "../../../Styles/NavBar/nav02";
import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import ProductManagement from "../../SellerDashboard/ProductManagement/ProductManagement";
import Dashboard from "../../SellerDashboard/Dashboard/Dashboard";
import OrderManagement from "../../SellerDashboard/OrderManagement";
import Profile from "../../SellerDashboard/Profile/Profile_S";
import SoldItems from "../../SellerDashboard/SoldItems";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductManagementIcon from '@mui/icons-material/Store';
import OrderManagementIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import ProfileIcon from '@mui/icons-material/AccountCircle';

const NavSellerDashboard_V = ({ sellerId }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [show, setShow] = useState(!isXs || !isMd);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedComponent, setSelectedComponent] = useState(
    <Dashboard sellerId={sellerId} />
  );

  useEffect(() => {
    setShow(!isXs);
  }, [isXs]);

  useEffect(() => {
    switch (selectedTab) {
      case "dashboard":
        setSelectedComponent(<Dashboard sellerId={sellerId} />);
        break;
      case "productManagement":
        setSelectedComponent(<ProductManagement sellerId={sellerId} />);
        break;
      case "orderManagement":
        setSelectedComponent(<OrderManagement sellerId={sellerId} />);
        break;
      case "soldItems":
        setSelectedComponent(<SoldItems sellerId={sellerId} />);
        break;
      case "profile_S":
        setSelectedComponent(<Profile sellerId={sellerId} />);
        break;
      default:
        setSelectedComponent(<Dashboard sellerId={sellerId} />);
    }
  }, [selectedTab, sellerId]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      sx={{ padding: { md: "0 2vw", lg: "0 7vw" } }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
        xs={2}
        sm={3}
        md={3}
        lg={3}
      >
        <NavList>
          <NavListItemText onClick={() => handleTabClick("dashboard")} sx={{width:{sm:"150px",md:"250px" , xs:"50px"}}}>
            <DashboardIcon />
            {show && "Dashboard"}
          </NavListItemText>
          <NavListItemText onClick={() => handleTabClick("productManagement")} sx={{width:{sm:"150px",md:"250px" , xs:"50px"}}}>
            <ProductManagementIcon />
            {show && "Product Management"}
          </NavListItemText>
          <NavListItemText onClick={() => handleTabClick("orderManagement")} sx={{width:{sm:"150px",md:"250px" , xs:"50px"}}}>
            <OrderManagementIcon />
            {show && "Order Management"}
          </NavListItemText>
          <NavListItemText onClick={() => handleTabClick("soldItems")} sx={{width:{sm:"150px",md:"250px" , xs:"50px"}}}>
            <SellIcon />
            {show && "Sold Items"}
          </NavListItemText>
          <NavListItemText onClick={() => handleTabClick("profile_S")} sx={{width:{sm:"150px",md:"250px" , xs:"50px"}}}>
            <ProfileIcon />
            {show && "Profile"}
          </NavListItemText>
        </NavList>
        <Divider />
      </Grid>
      <Grid item xs={10} md={9} lg={9} sm={9}>
        {selectedComponent}
      </Grid>
    </Grid>
  );
};

export default NavSellerDashboard_V;
