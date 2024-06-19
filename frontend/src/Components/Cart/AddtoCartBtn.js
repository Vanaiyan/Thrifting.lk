import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Actions/cartActions";
import LoginPromptModal from "../Home/loginPromptModal"; // Adjust the import path as needed

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCartClick = () => {
    if (authenticated) {
      const quantity = 1; // Set the quantity as needed
      dispatch(addToCart({ productId, quantity }));
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="add to cart"
        sx={{ position: "absolute", bottom: "10px" }}
        onClick={handleAddToCartClick}
      >
        <AddShoppingCartIcon />
      </IconButton>
      <LoginPromptModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AddToCartButton;
