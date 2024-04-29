import NavBar from "../../Components/Navigation bar/navigation";
import Banner from "../../Components/SellerPage/Banner";
import { Box, Typography } from "@mui/material";
import { List } from "../../Components/SellerPage/Reasonlist";
import { Steps } from "../../Components/SellerPage/Steps";

export const SellerPage = () => {
  return (
    <Box sx={{}}>
      <NavBar />
      <Banner />
      <br />
      <Typography
        variant="title1"
        sx={{
          margin: { lg: "2vw 7vw 0vw 7vw", md: "1vw 2vw" },
          fontWeight: 600,
        }}
      >
        Why join Thrifting.lk
      </Typography>
      <List />
      <Steps />
    </Box>
  );
};
