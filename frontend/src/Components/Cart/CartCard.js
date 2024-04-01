import React from "react";
import { useState } from "react";
import {
  Box,
  Stack,
  Select,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../Styles/Theme";
import { useDispatch } from "react-redux";
import { removeItem, updateCartItemQuantity } from "../../Actions/cartActions";

const CartCard = ({ productId, productName, price, quantity, description }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setSelectedQuantity(newQuantity);
    dispatch(updateCartItemQuantity(productId, newQuantity));
  };
  const dispatch = useDispatch();

  const clickDelete = () => {
    console.log("prod Id", productId);
    dispatch(removeItem(productId));
  };
  return (
    <Box
      padding={"15px"}
      border={"1px solid"}
      //   boxShadow={"0px 10px 30px rgba(0, 0, 0, 0.2)"}
      sx={{
        borderColor: Colors.Inborder,
        borderRadius: "6px",
        transition: "box-shadow 0.2s ease-in",
        position: "relative",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          width={"170px"}
          height={"170px"}
          sx={{
            border: "1px solid",
            borderRadius: "6px",
            borderColor: Colors.Inborder,
          }}
        ></Box>
        <IconButton
          aria-label="delete"
          color="error"
          size="small"
          sx={{
            justifyContent: "flex-end",
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
          onClick={clickDelete}
        >
          <CloseIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
        <Stack spacing={1} height={"100%"} width={"100%"}>
          <Typography variant="subtitle2">
            {/* Tshirt with multiple lines */}
            {productName}
          </Typography>

          <Typography variant="subtitle3">
            {description}
            {/* Size: medium, Color: blue, Material: Plastic Seller: Artel Market */}
          </Typography>

          <Typography variant="subtitle2">{price}</Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" sx={{ color: Colors.InPholder }}>
              Quantity:
            </Typography>
            <Select
              size="small"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              variant="outlined"
              sx={{ fontSize: "0.8rem", minWidth: "rem" }} // Adjust font size and box size here
            >
              {/* Generate dropdown options */}
              {[...Array(10).keys()].map((quantity) => (
                <MenuItem key={quantity + 1} value={quantity + 1}>
                  {quantity + 1}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"flex-end"}
          >
            <Button variant="outlined" color="primary" size="small">
              <Typography sx={{ fontSize: "12px" }}>Buy Now</Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartCard;
