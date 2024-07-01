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

export default function ProductCardlg({ id, title, price, imageSrc }) {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardClick = async () => {
    try {
      await dispatch(pushInteractedProduct(id));
      navigate(`/productDetail/${id}`);
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
        width: { lg: "200px", md: "180px", sm: "160px", xs: "150px" },
        height: { lg: "300px", md: "290px", sm: "290px", xs: "290px" },
        borderRadius: "20px",
        padding: "0",
        position: "relative",
        transition: "box-shadow 0.3s ease-in",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.3)",
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
          {title}
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
