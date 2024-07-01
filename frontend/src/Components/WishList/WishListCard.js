import React from "react";
import { Box, Stack, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../Styles/Theme";
import { grey } from "@mui/material/colors";
import AddToCartButton from "../Cart/AddtoCartBtn";

// Utility function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const WishlistCard = ({
  productId,
  productName,
  price,
  description,
  image,
  onRemove,
}) => {
  return (
    <Box
      padding={"15px"}
      border={"1px solid"}
      sx={{
        maxWidth: "450px",
        margin: 0,
        borderColor: Colors.Inborder,
        borderRadius: "6px",
        transition: "box-shadow 0.3s ease-in",
        position: "relative",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          width={"200px"}
          height={"170px"}
          sx={{
            border: "1px solid",
            borderRadius: "6px",
            borderColor: Colors.Inborder,
          }}
        >
          <img
            src={image}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the box while maintaining its aspect ratio
            }}
          />
        </Box>
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
          onClick={onRemove}
        >
          <CloseIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
        <Stack spacing={1} height={"100%"} width={"100%"}>
          {productName && (
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {truncateText(productName, 5)}{" "}
              {/* Truncate productName to 5 words */}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color={grey[600]}>
              {truncateText(description, 15)}{" "}
              {/* Truncate description to 10 words */}
            </Typography>
          )}

          <Typography variant="subtitle2">{price}</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"flex-end"}
          >
            <AddToCartButton productId={productId} />
            {/* <Button variant="outlined" color="primary" size="small">
              <Typography sx={{ fontSize: "12px" }}>Buy Now</Typography>
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WishlistCard;
