import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import WishlistIconButton from "../WishList/WishListIcon";
import { pushInteractedProduct } from "../../Actions/homeProductActions"; // Adjust path as necessary

export default function ProductCardlg({ title, price, imageSrc, id }) {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleCardClick = async () => {
    // Call the pushInteractedProduct action
    try {
      await pushInteractedProduct(id);
    } catch (error) {
      console.error("Error pushing interacted product:", error);
      // Handle error as needed
    }
  };

  return (
    <Card
      component={Link}
      to={`/productDetail/${id}`}
      sx={{
        width: { lg: "200px", md: "180px", sm: "160px", xs: "150px" },
        height: { lg: "300px", md: "290px", sm: "290px", xs: "290px" },
        borderRadius: "20px",
        padding: "0",
        position: "relative",
        transition: "box-shadow 0.3s ease-in",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={handleCardClick} // Call pushInteractedProduct on card click
    >
      <CardMedia sx={{ height: 200 }} image={imageSrc} title={title} />
      <CardContent
        sx={{
          border: "1px #DEE2E7",
          height: 100,
          marginBottom: "10px",
          transition: "background-color 0.4s ease-in", // Increased transition time to 2 seconds
          "&:hover": {
            bgcolor: "#D9D9D9",
          },
        }}
      >
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ color: "dimgrey" }}
        >
          {title}
          {id}
        </Typography>
        <Typography variant="subtitle2">Price: {price}</Typography>
      </CardContent>

      <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <WishlistIconButton />
      </CardActions>
    </Card>
  );
}
