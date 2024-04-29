import React from "react";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Actions/cartActions";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    const quantity = 1; // Set the quantity as needed
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to cart"
      sx={{ position: "absolute", bottom: "10px" }}
      onClick={handleAddToCartClick}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCartButton;
