// NavDesktop.js
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
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Grid } from "@mui/material";

export const NavDesktop = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ padding: { md: "0 2vw", lg: "0 7vw" } }}
    >
      <Grid item md={2.7} lg={3}>
        <NavTitle sx={{ color: "#ff5003" }}>Thrifting.lk</NavTitle>
        <Divider orientation="vertical" flexItem />
      </Grid>

      <Grid
        item
        md={4.3}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <NavList type="row">
          <NavLink to="/" exact activeClassName="active">
            <NavListItemText>Home</NavListItemText>
          </NavLink>
          <NavLink to="/seller" exact activeClassName="active">
            <NavListItemText>SELL</NavListItemText>
          </NavLink>

          <NavListItemText>CATEGORIES</NavListItemText>
          <NavListItemText>ABOUT</NavListItemText>
        </NavList>
      </Grid>

      <Grid
        item
        md={2}
        lg={2}
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

      <Grid
        item
        lg={3}
        md={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonContainer>
          <NavLink to="/login" exact activeClassName="active">
            <NavListItemText>Log In</NavListItemText>
          </NavLink>
          <NavLink to="/signup" exact activeClassName="active">
            <SignUpButton> SignUp</SignUpButton>
          </NavLink>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
