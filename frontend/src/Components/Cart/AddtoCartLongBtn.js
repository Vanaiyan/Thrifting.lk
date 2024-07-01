import React, { useState } from "react";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Actions/cartActions";
import LoginPromptModal from "../Home/loginPromptModal"; // Adjust the import path as needed

const AddToCartLongButton = ({ productId }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCartClick = () => {
    if (authenticated) {
      console.log("ProductId");
      console.log(productId);
      dispatch(addToCart({ productId }));
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        sx={{ height: "35px", width: "180px" }}
        onClick={handleAddToCartClick}
      >
        Add to Cart
      </Button>
      <LoginPromptModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AddToCartLongButton;
