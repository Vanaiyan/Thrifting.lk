import React, { useState, useEffect } from "react";
import {
  NavList,
  NavListItemText,
} from "../../../Styles/NavBar/nav02";
import { Divider, Grid } from "@mui/material";
import ProductManagement from "../../SellerDashboard/ProductManagement/ProductManagement";
import Dashboard from "../../SellerDashboard/Dashboard/Dashboard";
import OrderManagement from "../../SellerDashboard/OrderManagement";
import Chat from "../../SellerDashboard/Chat";
import Profile_S from "../../SellerDashboard/Profile/Profile_S";

const NavSellerDashboard_V = ({sellerId}) => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedComponent, setSelectedComponent] = useState(<Dashboard sellerId={sellerId}/>);

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
      case "chat":
        setSelectedComponent(<Chat sellerId={sellerId} />);
        break;
      case "profile_S":
        setSelectedComponent(<Profile_S sellerId={sellerId} />);
        break;
        

      default:
        setSelectedComponent(<Dashboard  sellerId={sellerId} />);
    }
  }, [selectedTab]);

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
          flexDirection: "column",
        }}
        xs={3}
      >
        <NavList>
          <NavListItemText onClick={() => handleTabClick("dashboard")}>Dashboard</NavListItemText>
          <NavListItemText onClick={() => handleTabClick("productManagement")}>Product Management</NavListItemText>
          <NavListItemText onClick={() => handleTabClick("orderManagement")}>Order Management</NavListItemText>
          <NavListItemText onClick={() => handleTabClick("chat")}>Chat</NavListItemText>
          <NavListItemText onClick={() => handleTabClick("profile_S")}>Profile</NavListItemText>
        </NavList>
        <Divider />
      </Grid>
      <Grid item xs={9}>
        {selectedComponent}
      </Grid>
    </Grid>
  );
};

export default NavSellerDashboard_V;
