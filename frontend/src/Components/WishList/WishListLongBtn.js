import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getWishlistItems } from "../../Actions/wishListActions";
import LoginPromptModal from "../Home/loginPromptModal";

const WishlistLongButton = ({ productId }) => {
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
      <Button
        variant="outlined"
        startIcon={isWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleWishlistClick}
        sx={{ height: "35px", width: "180px" }}
      >
        {"Save for later"}
      </Button>
      <LoginPromptModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default WishlistLongButton;
