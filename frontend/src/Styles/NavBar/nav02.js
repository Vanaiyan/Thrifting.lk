import styled from "@emotion/styled";
import { Colors } from "../Theme";
import { Button, List } from "@mui/material";

export const NavListItemText = styled(Button)({
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  backgroundColor: "#ff5003",
  minWidth: "50px",
  maxWidth: "300px",
  borderRadius: "10px",
  padding: "5px 10px",
  color: "#ffffff",
  "&:hover": {
    color: Colors.primary,
    background: Colors.dovegrey,
    borderRadius: "5px",
  },
});

export const NavList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "flex-start", // Align items to start
  padding: "0", // Reset padding if needed
  margin: "0",  // Reset margin if needed
  minWidth: "50px",
  maxWidth: "300px",
});
