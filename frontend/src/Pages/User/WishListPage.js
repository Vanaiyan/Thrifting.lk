import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import NavigationAuth from "../../Components/Navigation bar/navigationAuth";
import { Colors } from "../../Styles/Theme";
import { getWishlistItems } from "../../Actions/wishListActions"; // Import the action to fetch wishlist items
import WishlistCard from "../../Components/WishList/WishListCard";
import { removeFromWishlist } from "../../Actions/wishListActions";
import Footer from "../../Components/Footer/Footer";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems.products
  );
  // console.log("wishItems in page", wishlistItems);

  useEffect(() => {
    dispatch(getWishlistItems()); // Fetch wishlist items when the component mounts
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId));
      dispatch(getWishlistItems()); // Fetch wishlist items again to trigger rerender
    } catch (error) {
      console.error("Error removing item from wishlist:", error.message);
    }
  };

  return (
    <>
      <Box
        bgcolor={Colors.bg}
        sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}
      >
        <NavigationAuth />
        <h2 style={{ margin: "5vh 7vw 0 7vw" }}>WishList</h2>
        <Divider sx={{ margin: "2vh 7vw" }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 0fr))",
            gap: "1rem",
            padding: "0 7vw",
            justifyContent: "space-around",
          }}
        >
          {wishlistItems &&
            wishlistItems.map((wishlistItem) => (
              <WishlistCard
                key={wishlistItem._id}
                productId={wishlistItem._id}
                productName={wishlistItem.name}
                price={wishlistItem.price}
                description={wishlistItem.description}
                image={wishlistItem.pictures[0].image}
                onRemove={() => handleRemoveFromWishlist(wishlistItem._id)}
              />
            ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default WishlistPage;
