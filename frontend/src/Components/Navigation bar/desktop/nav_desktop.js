import React from "react";
import {
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
import Search from "@mui/icons-material/Search";
import SearchItem from "../../Home/SearchItem";

const scrollToFooter = () => {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
};

export const NavDesktop = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ padding: { md: "0 2vw", lg: "0 7vw" } }}
    >
      <Grid item md={2.7} lg={3}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <NavTitle sx={{ color: "#ff5003" }}>Thrifting.lk</NavTitle>
        </Link>
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
          <NavLink to="/" exact="true">
            <NavListItemText>Home</NavListItemText>
          </NavLink>
          <NavLink to="/seller" exact="true">
            <NavListItemText>SELL</NavListItemText>
          </NavLink>
          <NavLink to="/product" exact="true">
            <NavListItemText>CATEGORIES</NavListItemText>
          </NavLink>
          <a onClick={scrollToFooter} style={{ cursor: "pointer" }}>
            <NavListItemText>ABOUT</NavListItemText>
          </a>
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
        <SearchItem />
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
