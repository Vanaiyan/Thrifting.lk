import React from "react";
import NavDashboard_V from "../../Components/Navigation bar/desktop/nav-sellerDashboard_V";
import NavDashboard_H from "../../Components/Navigation bar/desktop/nav-sellerDashboard_H";
import { Grid } from "@mui/material";

const Dashboard_S = () => {
  const sellerId = "6648fcb3d57b2383f46d43ff";
  return (
    <Grid container>
      <Grid item xs={12} paddingBottom={3}>
        <NavDashboard_H sellerId={sellerId} />
      </Grid>

      <Grid item xs={12} paddingBottom={3}>
        <NavDashboard_V sellerId={sellerId} />
      </Grid>
    </Grid>
  );
};

export default Dashboard_S;
