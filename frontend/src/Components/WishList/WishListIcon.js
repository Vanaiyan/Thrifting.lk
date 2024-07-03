import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToWishlist, getWishlistItems } from "../../Actions/wishListActions";
import { useSelector } from "react-redux";
import LoginPromptModal from "../Home/loginPromptModal";

const WishlistIconButton = ({ productId }) => {
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems.products
  );
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isWishlist, setIsWishlist] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if the product is in the wishlist when wishlistItems or productId change
    const isInWishlist =
      wishlistItems && wishlistItems.some((item) => item._id === productId);
    setIsWishlist(isInWishlist);
  }, [wishlistItems, productId]);

  const handleWishlistClick = async () => {
    if (!authenticated) {
      setModalOpen(true);
      return;
    }

    try {
      const response = await addToWishlist(productId);
      // console.log(response);
      setIsWishlist(!isWishlist);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        color={isWishlist ? "primary" : "default"}
        aria-label={isWishlist ? "remove from wishlist" : "add to wishlist"}
        onClick={handleWishlistClick}
        sx={{ bgcolor: "rgba(255, 255, 255, 0.4)" }}
      >
        {isWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <LoginPromptModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default WishlistIconButton;
