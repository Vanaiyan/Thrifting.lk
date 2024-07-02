import React, { useEffect, useState } from "react";
import NavDashboard_V from "../../Components/Navigation bar/desktop/nav-sellerDashboard_V";
import NavDashboard_H from "../../Components/Navigation bar/desktop/nav-sellerDashboard_H";
import { Box, CircularProgress, Grid } from "@mui/material";
import FloatingButton from "../../Components/Chat/floatingbutton";
import { useSelector } from "react-redux";

const Dashboard_S = () => {

  const user = useSelector((state) => state.auth.user); // Access the auth state
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setSellerId(user._id);
    }
  }, [user]);

  if (!sellerId) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} paddingBottom={3} sx={{height:"15vh"}}>
        <NavDashboard_H sellerId={sellerId} />
      </Grid>

      <Grid item xs={12} paddingBottom={3}>
        <NavDashboard_V sellerId={sellerId} />
      </Grid>
      <FloatingButton/>
    </Grid>
  );
};
export default Dashboard_S;
