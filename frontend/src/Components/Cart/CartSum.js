import React from "react";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Colors } from "../../Styles/Theme";
import { useEffect } from "react";
const CartSum = (products) => {
  // const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total sum, discount, and amount to pay
  const calculateTotals = () => {
    let totalSum = 0;
    let totalDiscount = 0;

    products.products.forEach((item) => {
      totalSum += item.price;
      totalDiscount += item.discount;
    });

    const amountToPay = totalSum - totalDiscount;

    return { totalSum, totalDiscount, amountToPay };
  };

  const { totalSum, totalDiscount, amountToPay } = calculateTotals();

  useEffect(() => {
    const { totalSum, totalDiscount, amountToPay } = calculateTotals();
    // console.log(products.products);
    // console.log(amountToPay);
    // Update state or perform any other actions based on new totals
  }, [products]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box
        padding={"15px"}
        border={"1px solid"}
        width={"300px"}
        boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.2)"}
        sx={{
          borderColor: Colors.Inborder,
          borderRadius: "6px",
          transition: "box-shadow 0.2s ease-in",
        }}
      >
        <Stack spacing={1} sx={{ position: "relative" }}>
          <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
            <Typography variant="subtitle3">SubTotal</Typography>
            <Typography variant="subtitle3">{totalSum}</Typography>
          </Stack>
          <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
            <Typography variant="subtitle3"> Discount</Typography>
            <Typography variant="subtitle3" sx={{ color: "red" }}>
              {" "}
              {totalDiscount}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ margin: "20px 0" }} />
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="subtitle2">LKR {amountToPay}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default CartSum;
