import React from "react";
import NavBar from "../../Components/Navigation bar/navigation";
import { Box, Typography } from "@mui/material";
import CartSeller from "../../Components/Cart/CartSeller";
import { Colors } from "../../Styles/Theme";
import NavigationAuth from "../../Components/Navigation bar/navigationAuth";

const CartPage = () => {
  return (
    <Box bgcolor={Colors.bg}>
      <NavigationAuth />
      <CartSeller />
    </Box>
  );
};

export default CartPage;
