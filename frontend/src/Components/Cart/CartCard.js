import React from "react";
import { useState, useEffect } from "react";
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
import ReportIcon from "@mui/icons-material/Report";

const CartCard = ({
  productId,
  productName,
  price,
  quantity,
  description,
  cartTimestamp,
}) => {
  const expirationHours = 48; // 48 hours in milliseconds
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const timeAdded = new Date(cartTimestamp).getTime();
      const timeNow = Date.now();
      const timeDifference =
        expirationHours * 60 * 60 * 1000 - (timeNow - timeAdded);

      const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (hoursRemaining > 1) {
        return `${hoursRemaining} hours`;
      } else if (hoursRemaining === 1) {
        return `${hoursRemaining} hour`;
      } else if (minutesRemaining > 30) {
        return `about 1 hour`;
      } else {
        return `${minutesRemaining} minutes`;
      }
    };

    setRemainingTime(calculateRemainingTime());
  }, [cartTimestamp]);

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
          <Stack>
            <Typography variant="subtitle2">
              {/* Tshirt with multiple lines */}
              {productName}
            </Typography>
          </Stack>
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

              {/* To check the remainingTime */}
              {/* <h5>{remainingTime}</h5> */}
            </Select>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"flex-end"}
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              position="absolute"
              right="0px"
            >
              <Typography sx={{ fontSize: "12px" }}>Buy Now</Typography>
            </Button>
          </Stack>

          {remainingTime &&
          remainingTime.includes("hour") &&
          parseInt(remainingTime) < 6 ? ( //To change the warning time limit. It is set to 6 hours
            <Stack direction="row" alignItems="center">
              <ReportIcon sx={{ color: "red" }} />
              <Typography variant="body2" color="red">
                This item will be removed from your cart in {remainingTime}.
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartCard;
