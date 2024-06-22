import { styled, Grid } from "@mui/material";

// Define a styled component for the Grid
export const StyledGrid = styled(Grid)({
  border: "1px solid #ccc",
  padding: "0 10px",
  width:'300px',
  height:'400px',
  borderRadius:'20px'
});

// Define a styled component for the blur effect
export const BlurOverlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  zIndex: 2,
  pointerEvents: "none",
});
