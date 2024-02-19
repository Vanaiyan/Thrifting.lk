import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";

export default function ProductCardmd({ title, price, imageSrc }) {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <Card
      sx={{
        width: { lg: "200px", md: "180px", sm: "160px", xs: "150px" },
        height: { lg: "300px", md: "300px", sm: "280px", xs: "280px" },
        borderRadius: "15px",
        padding: "10px 0",
        // boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.2)",
        position: "relative",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia sx={{ height: 200 }} image={imageSrc} title={title} />
      <CardContent>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ color: "dimgrey" }}
        >
          {title}Original Beats Solo Pro
        </Typography>
        <Typography variant="subtitle2">Price: {price}3999</Typography>
      </CardContent>

      <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
        {isWishlist ? (
          <IconButton
            color="error"
            aria-label="remove from wishlist"
            onClick={handleWishlistClick}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            color="default"
            aria-label="add to wishlist"
            onClick={handleWishlistClick}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
