import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography, Paper } from "@mui/material";
import NavigationAuth from "../../Components/Navigation bar/navigationAuth";
import CartSeller from "../../Components/Cart/CartSeller";
import { Colors } from "../../Styles/Theme";
import { getCartProducts } from "../../Actions/cartActions";
import { grey } from "@mui/material/colors";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <Box bgcolor={Colors.bg}>
      <NavigationAuth />
      <h2 variant="title" style={{ padding: "30px 7vw 10px 7vw" }}>
        Shopping Cart
      </h2>
      {Object.entries(cartItems).map(([sellerId, products]) => (
        <Box key={sellerId} sx={{ margin: "2vw 7vw" }}>
          <CartSeller cartItems={products} />
        </Box>
      ))}
    </Box>
  );
};

export default CartPage;
