// src/Styles/Footer/FooterStyle.js
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

export const footerStyles = {
  container: {
    padding: "10px 20px",
    borderRadius: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#FF8841",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  errorMessage: {
    marginBottom: "10px",
  },
  successMessage: {
    marginBottom: "10px",
  },

  footerContainer: {
    backgroundColor: "#242325",

    padding: " 20px 100px",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    a: {
      color: "#8B96A5",
      textDecoration: "none",
      marginBottom: "8px",
    },
    h3: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color:"#fff"
    },
    ul: {
      listStyleType: "none",
      padding: 0,
    },
    li: {
      marginBottom: "8px",
    },
  },
  socialLinks: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
};

export const NavTitle = styled(Typography)(() => ({
  width: "194px",
  height: "30px",
  fontFamily: "'Dela Gothic One', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "40px",
  lineHeight: "100%",
  letterSpacing: "-0.02em",
  flexGrow: 0,
  padding: "20px 0",
}));

export const Typo1 = styled(Typography)(({ theme }) => ({
  padding: "20px 0",
  fontFamily: "Inter",
  fontWeight: 200,
  letterSpacing: "0.14em",
  color: "#8B96A5",
  textTransform: "uppercase",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.4rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
}));

export const linkStyle = {
  textDecoration: "none",
  color: "#8B96A5",
  display: "flex",
  alignItems: "center",
};
