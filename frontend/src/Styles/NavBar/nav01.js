// nav01.js
import {
  Box,
  Button,
  Typography,
  List,
  ListItemText,
  Input,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/system";

export const NavContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px",
  width: "100%",
  gap: "10px",

  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
  },
}));

export const NavTitle = styled(Typography)(() => ({
  width: "194px",
  height: "30px",
  fontFamily: "'Dela Gothic One', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "30px",
  lineHeight: "100%",
  letterSpacing: "-0.02em",
  flexGrow: 0,
}));

//seller dashboard
export const NavSubTitle = styled(Typography)(() => ({
  width: "194px", 
  height: "30px",
  fontFamily: "'Courier New', sans-serif",
  fontStyle:'normal',
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "-0.01em",
  flexGrow: 0,
}));
//
export const NavList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  justifyContent: "space-between",
  gap: "0px",
  width: "350px",
}));

export const NavListItemText = styled(Button)({
  fontSize: "14px",
  fontWeight: 500,
  color: "#000000",
  "&:hover": {
    background: "#fffafa",
    borderRadius: 0,
  },
});

export const SearchContainer = styled(Box)({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "12px",
  gap: "10px",
  margin: "0",
  maxHeight: "35px",
  background: "#FFFFFF",
  border: "1px solid #CED4DA",
  borderRadius: "45px",
  width: "200px",
});

export const SearchInput = styled(Input)({
  width: "100%",
  border: "none",
  textDecoration: "none",
  "&::placeholder": {
    color: "#CED4DA",
    textDecoration: "none",
  },
});
export const ButtonContainer = styled(Box)(() => {
  const theme = useTheme();

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    gap: "10px",
    minWidth: "200px",
    flexGrow: 0,

    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
    },
  };
});

export const SignUpButton = styled(Button)({
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 0px",
  background: "#FF5003",
  borderRadius: "45px",
  border: "none",
  color: "#fff",
  maxHeight: "35px",
  minWidth: "100px",

  "&:hover": {
    color: "#000",
  },
});
