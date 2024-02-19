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

export const NavLoginDesktop = () => {
  return (
    <Grid container spacing={4} alignItems="center" sx={{ padding: "0 7vw" }}>
      <Grid item md={3} lg={3}>
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
      >
        <NavList type="row" gap="10px">
          <NavListItemText>HOME</NavListItemText>
          <NavListItemText>SELL</NavListItemText>
          <NavListItemText>CATEGORIES</NavListItemText>
          <NavListItemText>ABOUT</NavListItemText>
        </NavList>
      </Grid>

      <Grid
        item
        md={4}
        lg={5}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </SearchContainer>
      </Grid>
    </Grid>
  );
};
