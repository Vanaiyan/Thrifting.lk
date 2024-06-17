import React from "react";
import {
  NavContainer,
  NavList,
  NavTitle,
  NavListItemText,
  SearchContainer,
  SearchInput,
  ButtonContainer,
  SignUpButton,
} from "../../../Styles/NavBar/nav01";
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon from Material-UI
import { Divider, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavLoginDesktop = () => {
  return (
    <Grid container spacing={4} alignItems="center" sx={{ padding: "0 7vw" }}>
      <Grid item md={3} lg={3} marginY={2}>
        <NavTitle sx={{ color: "#ffff" }}>Thrifting.lk</NavTitle>
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
      ></Grid>
    </Grid>
  );
};
