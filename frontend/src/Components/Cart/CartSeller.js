import React, { useEffect } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import CartCard from "./CartCard";
import CartSum from "./CartSum";

const CartSeller = ({ cartItems }) => {
  useEffect(() => {
    // console.log("products list", cartItems);
  }, [cartItems]);

  // Check if cartItems is defined and an array before filtering
  const filteredCartItems = Array.isArray(cartItems)
    ? cartItems.filter((item) => !item.soldConfirmedBuyer)
    : [];
  return (
    <Box>
      {filteredCartItems && filteredCartItems.length > 0 ? (
        <>
          <Typography>Seller: {filteredCartItems[0].sellerName}</Typography>
          <Divider sx={{ margin: "5px 0 10px 0" }} />
          <Stack direction={"row"} spacing={2}>
            <Grid container justifyContent={"space-between"}>
              <Grid item lg={8}>
                <Stack spacing={2}>
                  {filteredCartItems.map((item) => (
                    <CartCard
                      key={item.productId}
                      productId={item.productId}
                      productName={item.name}
                      description={item.description}
                      discount={item.discount}
                      price={item.price}
                      quantity={item.quantity}
                      seller={item.seller || ""}
                      cartTimestamp={item.cartTimestamp}
                      isInterested={item.isInterested}
                      interestedTimestamp={item.interestedTimestamp}
                      image={item.image}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item alignItems={"flex-end"}>
                <Stack justifyContent={"flex-end"} height={"100%"}>
                  <CartSum products={filteredCartItems} />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CartSeller;
