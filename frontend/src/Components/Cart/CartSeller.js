import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../../Actions/cartActions";
import CartCard from "../Cards/CartCard";
import CartSum from "../Cards/CartSum";

const CartSeller = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCartProducts())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    console.log("products", cartItems);
  }, [dispatch]);

  return (
    <Box sx={{ margin: "2vw 10vw" }}>
      <Typography>Seller : Airtel Market</Typography>
      <Divider sx={{ margin: "5px 0 10px 0" }} />
      <Stack direction={"row"} spacing={2}>
        <Grid container justifyContent={"space-between"}>
          <Grid item lg={8}>
            <Stack spacing={2}>
              {loading ? (
                <CircularProgress /> // Show loading indicator while fetching data
              ) : (
                cartItems.map((item) => (
                  <CartCard
                    key={item.productId}
                    productName={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))
              )}
            </Stack>
          </Grid>
          <Grid item alignItems={"flex-end"}>
            <Stack justifyContent={"flex-end"} height={"100%"}>
              <CartSum />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CartSeller;
