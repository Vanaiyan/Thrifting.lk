import React from "react";
import NavBar from "../../Components/Navigation bar/navigation";
import { Box, Typography } from "@mui/material";
import CartSeller from "../../Components/Cart/CartSeller";

const CartPage = () => {
  return (
    <div>
      <NavBar />
      <CartSeller />
    </div>
  );
};

export default CartPage;
