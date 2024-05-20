import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import { Colors } from "../Theme";
import {
    Box,
    Button,
    Typography,
    List,
  } from "@mui/material";

export const NavListItemText = styled(Button)({
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
 backgroundColor:"#ff5003",
  minWidth:'250px',
    borderRadius: "10px",
    padding: "5px 10px",
    color: "#000000",
    "&:hover": {
      background: Colors.dovegrey,
      borderRadius: "5px",
    },
  });

  export const NavList = styled(List)({
  display: "flex",
  flexDirection: "column", 
  gap: "20px", 
  minWidth: "250px", 
});