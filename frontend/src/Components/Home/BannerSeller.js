import { Box, Typography } from "@mui/material";
import theme from "../../Styles/Theme";

export const BannerSeller = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#242325",
          borderRadius: { lg: "45px", md: "30px", sm: "25px" },
          height: "50vh",
          width: "100vw",
        }}
      >
        <Typography>Earn from your extras.</Typography>
        <Typography>Showcase and sell your goods today.</Typography>
      </Box>
    </div>
  );
};
