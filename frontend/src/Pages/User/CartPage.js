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

  useEffect(() => {
    const fetchCartProducts = async () => {
      await dispatch(getCartProducts());
    };
    fetchCartProducts();
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("CartItems : ", cartItems);

  return (
    <Box bgcolor={Colors.bg}>
      <NavigationAuth />
      <h2 variant="title" style={{ padding: "30px 7vw 10px 7vw" }}>
        Shopping Cart
      </h2>
      <h5
        style={{
          padding: "10px 7vw 1px 7vw",
          fontWeight: "100",
        }}
      >
        Hey there! Just a heads-up <br />
        <ul style={{ marginLeft: "20px" }}>
          <li>
            Items in your cart are reserved for<strong> 24 hours</strong>. Make
            sure to complete your purchase soon so you don’t miss out on your
            favorite finds!
          </li>
          <br />
          <li>
            Once you click the "Buy Now" button, you have
            <strong> 48 hours</strong> to confirm your purchase with the seller.
            <br /> If you do not confirm the purchase within this timeframe, the
            item will be automatically removed from your reserved list.
          </li>
        </ul>
      </h5>
      {Object.entries(cartItems).map(([sellerId, products]) => (
        <Box key={sellerId} sx={{ margin: "2vw 7vw" }}>
          <CartSeller cartItems={products} />
        </Box>
      ))}
    </Box>
  );
};

export default CartPage;
