import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToWishlist } from "../../Actions/wishListActions";
import { useSelector } from "react-redux";
import { getWishlistItems } from "../../Actions/wishListActions";

const WishlistIconButton = ({ productId }) => {
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems.products
  );
  const [isWishlist, setIsWishlist] = useState(false); // Initialize isWishlist as false

  useEffect(() => {
    // Check if the product is in the wishlist when wishlistItems or productId change
    const isInWishlist =
      wishlistItems && wishlistItems.some((item) => item._id === productId);
    setIsWishlist(isInWishlist); // Update isWishlist state based on the result
  }, [wishlistItems, productId]); // Run the effect whenever wishlistItems or productId changes

  const handleWishlistClick = async () => {
    try {
      const response = await addToWishlist(productId);
      console.log(response); // Handle the response as needed
      setIsWishlist(!isWishlist); // Update isWishlist state after adding to wishlist
    } catch (error) {
      console.error(error.message); // Handle errors
    }
  };

  return (
    <IconButton
      color={isWishlist ? "primary" : "default"}
      aria-label={isWishlist ? "remove from wishlist" : "add to wishlist"}
      onClick={handleWishlistClick}
    >
      {isWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default WishlistIconButton;
