// NavDesktop.js
import React from "react";
import {
  NavList,
  NavTitle,
  NavListItemText,
  SearchContainer,
  SearchInput,
  ButtonContainer,
} from "../../../Styles/NavBar/nav01";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const scrollToFooter = () => {
  document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
};

export const NavSellerDesktop = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const role = user ? user.role : 0;

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
          <NavLink to="/" exact activeClassName="active">
            <NavListItemText>Home</NavListItemText>
          </NavLink>
          <NavLink to="/seller" exact activeClassName="active">
            <NavListItemText>Sell</NavListItemText>
          </NavLink>

          <NavLink to="/product" exact activeClassName="active">
            <NavListItemText>CATEGORIES</NavListItemText>
          </NavLink>
          <a onClick={scrollToFooter} style={{ cursor: 'pointer' }}>
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
          {isAuthenticated && role === "Seller" ? (
            <NavLink to="/seller/dashboard" exact activeClassName="active">
              <Typography
                sx={{
                  textDecoration: "none",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "6px 20px",
                  background: "#1B202D",
                  borderRadius: "45px",
                  border: "none",
                  color: "#FFFF",
                  maxHeight: "35px",
                  minWidth: "60px",
                }}
              >
                SELLER DASHBOARD
              </Typography>
            </NavLink>
          ) : (
            <>
              <NavLink to="/seller/login" exact activeClassName="active">
                <NavListItemText>Log In</NavListItemText>
              </NavLink>
              <NavLink to="/seller/register" exact activeClassName="active">
                <Typography
                  sx={{
                    textDecoration: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "6px 20px",
                    background: "#1B202D",
                    borderRadius: "45px",
                    border: "none",
                    color: "#FFFF",
                    maxHeight: "35px",
                    minWidth: "60px",
                    "&:hover": {
                      color: "#FFF",
                      borderRadius: "45px",
                    },
                  }}
                >
                  SIGNUP
                </Typography>{" "}
              </NavLink>
            </>
          )}
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};
