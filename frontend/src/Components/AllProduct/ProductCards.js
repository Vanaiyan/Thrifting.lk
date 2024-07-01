import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToCartButton from "../Cart/AddtoCartBtn";

export default function ProductCards({ title, price, onAddToCartClick }) {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlist(!isWishlist);
  };

  // Function to truncate the title to a specified length
  const truncateTitle = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <Card
      sx={{
        width: { lg: "220px", md: "240px", sm: "220px", xs: "210px" },
        height: { lg: "350px", md: "340px", sm: "340px", xs: "340px" },
        borderRadius: "20px",
        padding: "0",
        margin: {
          lg: "1.5vw 0.5vw",
          md: "3vw 1vw 3vw 6vw",
          sm: "3vw 1vw 3vw 2vw",
          xs: "3vw 1vw 3vw 1vw",
        },
        position: "relative",
        transition: "box-shadow 0.3s ease-in",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <CardContent
        sx={{
          border: "1px #DEE2E7",
          height: 120,
          marginBottom: "10px",
          transition: "background-color 0.4s ease-in",
          "&:hover": {
            bgcolor: "#D9D9D9",
          },
        }}
      >
        <Typography
          fontSize="14px"
          component="div"
          sx={{
            fontWeight: 600,
            position: "absolute",
            top: "210px",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {truncateTitle(title, 50)} {/* Limit title to 50 characters */}
        </Typography>
        <Typography
          fontSize="14px"
          color="text.secondary"
          sx={{ position: "absolute", top: "280px" }}
        >
          Price: {price}
        </Typography

        <CardActions
          sx={{ display: "flex", alignItems: "flex-end", margin: 0 }}
        >
          <IconButton
            color="primary"
            aria-label="add to cart"
            sx={{ position: "absolute", bottom: "10px" }}
            onClick={onAddToCartClick}
          >
            <AddToCartButton />
          </IconButton>
        </CardActions>

        <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
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
      </CardContent>
    </Card>
  );
}
