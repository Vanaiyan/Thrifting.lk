// ProductDetailBox.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import AddToCartLongButton from "../Cart/AddtoCartLongBtn";
import WishlistLongButton from "../WishList/WishListLongBtn";

const labels = {
  0.5: "1.0",
  1: "2.0",
  1.5: "3.0",
  2: "4.0",
  2.5: "5.0",
  3: "6.0",
  3.5: "7.0",
  4: "8.0",
  4.5: "9.0",
  5: "10.0",
};

const ProductDetailBox = ({ product }) => {
  const [saved, setSaved] = useState(false);

  const handleSaveToggle = () => {
    setSaved(!saved);
  };

  return (
    <Box
      id="Four"
      width={400}
      height={550}
      sx={{
        // border: '1px solid gray',
        boxSizing: "border-box",
        marginLeft: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, paddingTop: "5px", fontSize: "26px" }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
        >
          {product.category.join(" | ")}
        </Typography>

        <Divider
          variant="middle"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#FA3434",
            marginTop: "15px",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          LKR {product.price - product.discount}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, color: "#8B96A5", fontSize: "15px" }}
            >
              Price:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, color: "#505050", fontSize: "15px" }}
            >
              Negotiable
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, color: "#8B96A5", fontSize: "15px" }}
            >
              Gender:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, color: "#505050", fontSize: "15px" }}
            >
              {product.gender}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, color: "#8B96A5", fontSize: "15px" }}
            >
              Category:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, color: "#505050", fontSize: "15px" }}
            >
              {product.category[0]}{" "}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, color: "#8B96A5", fontSize: "15px" }}
            >
              Protection:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, color: "#505050", fontSize: "15px" }}
            >
              Refund Policy
            </Typography>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        />
      </Box>{" "}
      <br />
      <Stack direction="row" spacing={2}>
        {/* <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          sx={{ height: "35px", width: "180px" }}
        >
          Add to Cart
        </Button> */}
        <AddToCartLongButton productId={product._id} />
        <WishlistLongButton productId={product._id} />
      </Stack>
    </Box>
  );
};

export default ProductDetailBox;
