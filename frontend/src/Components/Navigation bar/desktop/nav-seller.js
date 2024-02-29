import React from "react";
import {
  NavContainer,
  NavList,
  NavTitle,
  NavSubTitle,
  NavListItemText,
} from "../../../Styles/NavBar/nav01";
import { Divider, Grid } from "@mui/material";

export const NavSeller = ({Subtitle}) => {
  return (
    <Grid container spacing={4} alignItems="center" sx={{ padding: "0 7vw" }}>
      <Grid item md={3} lg={3} my={5} mx={4}  >
        <NavTitle sx={{ color: "#ff5003" }}>Thrifting.lk</NavTitle>
        <Divider orientation="vertical" flexItem />
      </Grid>

      <Grid
        item
        md={5}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <NavSubTitle sx={{ color: "#ff5003"}}>{Subtitle}</NavSubTitle>
      </Grid>
    </Grid>
  );
};
