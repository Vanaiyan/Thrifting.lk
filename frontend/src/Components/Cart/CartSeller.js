import React, { useEffect } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import CartCard from "./CartCard";
import CartSum from "./CartSum";

const CartSeller = ({ cartItems }) => {
  useEffect(() => {
    console.log("products list", cartItems);
  }, [cartItems]);

  return (
    <Box>
      {cartItems && cartItems.length > 0 ? (
        <Typography>Seller: {cartItems[0].sellerName}</Typography>
      ) : (
        <Typography>No items in cart</Typography>
      )}
      <Divider sx={{ margin: "5px 0 10px 0" }} />
      <Stack direction={"row"} spacing={2}>
        <Grid container justifyContent={"space-between"}>
          <Grid item lg={8}>
            <Stack spacing={2}>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartCard
                    key={item.productId}
                    productId={item.productId}
                    productName={item.name}
                    description={item.description}
                    discount={item.discount}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))
              ) : (
                <Typography>No items in cart</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item alignItems={"flex-end"}>
            <Stack justifyContent={"flex-end"} height={"100%"}>
              <CartSum products={cartItems} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CartSeller;
