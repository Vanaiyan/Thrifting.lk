import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import { Colors } from "../../Styles/Theme";
const CartSum = () => {
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
            <Typography variant="subtitle3">3900</Typography>
          </Stack>
          <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
            <Typography variant="subtitle3"> Discount</Typography>
            <Typography variant="subtitle3" sx={{ color: "red" }}>
              {" "}
              200
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ margin: "20px 0" }} />
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="subtitle2">LKR 3700</Typography>
        </Stack>

        <Button variant="contained" sx={{ width: "100%", margin: "10px 0" }}>
          Buy all
        </Button>
      </Box>
    </Grid>
  );
};

export default CartSum;
