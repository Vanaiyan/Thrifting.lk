import NavBar from "../../Components/Navigation bar/navigation";
import Banner from "../../Components/Home/Banner";
import ProductRow from "../../Components/Home/ProductRow1";
import { BannerSeller } from "../../Components/Home/BannerSeller";
import CategoriesList from "../../Components/Home/CategoryList";
import RecProducts from "../../Components/Home/RecProducts";
import { Box, Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <Box sx={{}}>
      <NavBar />
      <Banner />
      <Typography
        variant="subtitle1"
        sx={{ margin: "2vw 10vw", fontWeight: 600 }}
      >
        Top Choices for you
      </Typography>
      <ProductRow />
      <Typography
        variant="subtitle1"
        sx={{ margin: "2vw 10vw", fontWeight: 600 }}
      >
        Explore Popular Categories{" "}
      </Typography>
      <CategoriesList />

      <BannerSeller />
      <Typography
        variant="subtitle1"
        sx={{ margin: "2vw 10vw", fontWeight: 600 }}
      >
        Recommended items{" "}
      </Typography>
      <RecProducts />
    </Box>
  );
};
