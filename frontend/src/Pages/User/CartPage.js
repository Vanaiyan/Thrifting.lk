import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import NavigationAuth from "../../Components/Navigation bar/navigationAuth";
import CartSeller from "../../Components/Cart/CartSeller";
import { Colors } from "../../Styles/Theme";
import { getCartProducts } from "../../Actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <Box bgcolor={Colors.bg}>
      <NavigationAuth />
      {Object.entries(cartItems).map(([sellerId, products]) => (
        <Box key={sellerId}>
          {/* <h1>{cartItems[0].productId}</h1> */}
          <CartSeller cartItems={products} />
          {/* {products.map((cartItem) => (
          ))} */}
        </Box>
      ))}
    </Box>
  );
};

export default CartPage;
