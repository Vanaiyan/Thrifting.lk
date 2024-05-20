import React from "react";
import { NavSubTitle, NavTitle } from "../../../Styles/NavBar/nav01";
import { Divider, Grid, Box, Typography } from "@mui/material";

const navsellerDashboard_H = () => {
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
          {/* <NavSubTitle sx={{ color: "#ff5003", mr: 1 }}>SellerDashboard</NavSubTitle> */}
        </Box>
      </Grid>
      <Grid item md={6} lg={2} textAlign={"right"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Shathurya P {/* Seller's name */}</Typography>
          
        </Box>
      </Grid>
    </Grid>
  );
};

export default navsellerDashboard_H;
