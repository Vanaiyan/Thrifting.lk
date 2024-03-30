import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CartCard from "../Cards/CartCard";
import CartSum from "../Cards/CartSum";

const CartSeller = () => {
  return (
    <Box sx={{ margin: "2vw 10vw" }}>
      <Typography>Seller : Airtel Market</Typography>
      <Divider sx={{ margin: "5px 0 10px 0" }} />
      <Stack direction={"row"} spacing={2}>
        <Grid container justifyContent={"space-between"}>
          <Grid item lg={8}>
            <Stack spacing={2}>
              <CartCard />
              <CartCard />
            </Stack>
          </Grid>
          <Grid item alignItems={"flex-end"}>
            <Stack justifyContent={"flex-end"}>
              <CartSum />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CartSeller;
