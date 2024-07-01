import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import WishlistIconButton from "../WishList/WishListIcon";
import { Box } from "@mui/material";
import AddToCartButton from "../Cart/AddtoCartBtn";
import { pushInteractedProduct } from "../../Actions/homeProductActions"; // Adjust path as necessary
import { useDispatch } from "react-redux";

// Function to truncate the title to a specified length
const truncateTitle = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

export default function ProductCardsm({ id, title, price, imageSrc }) {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardClick = async () => {
    try {
      navigate(`/productDetail/${id}`);
      await dispatch(pushInteractedProduct(id));
    } catch (error) {
      console.error("Error pushing interacted product:", error);
      // Handle error as needed
    }
  };

  const handleButtonClick = (event) => {
    // Prevent the card click event from being triggered
    event.stopPropagation();
  };

  return (
    <Card
      sx={{
        position: "relative",
        minWidth: 180,
        maxWidth: 190,
        minHeight: 280,
        borderRadius: "15px",
        margin: "30px 0px",
        display: "block",
        padding: "0",
        transition: "box-shadow 0.2s ease-in",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={handleCardClick} // Call handleCardClick on card click
    >
      <CardMedia sx={{ height: 170 }} image={imageSrc} title={title} />
      <CardContent>
        <Typography
          fontSize="14px"
          component="div"
          sx={{ fontWeight: 600, position: "absolute", top: "170px" }}
        >
          {truncateTitle(title, 35)}
        </Typography>
        <Typography
          fontSize="14px"
          color="text.secondary"
          sx={{ position: "absolute", top: "210px" }}
        >
          Price: {price}
        </Typography>
        {recommendations.length > 0 && (
          <Typography fontSize="12px" sx={{ marginTop: "30px" }}>
            <strong>Recommended:</strong> {recommendations.join(", ")}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{ display: "flex", alignItems: "flex-end", marginTop: "15px" }}
        onClick={handleButtonClick}
      >
        <AddToCartButton productId={id} />
      </CardActions>
      <Box
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={handleButtonClick}
      >
        <WishlistIconButton productId={id} />
      </Box>
    </Card>
  );
}
