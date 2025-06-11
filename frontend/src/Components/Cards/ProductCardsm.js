import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import WishlistIconButton from "../WishList/WishListIcon";
import { Box } from "@mui/material";
import AddToCartButton from "../Cart/AddtoCartBtn";
import axios from "axios"; // Import Axios library
import { pushInteractedProduct } from "../../Actions/homeProductActions"; // Adjust path as necessary

export default function ProductCardsm({ id, title, price, imageSrc }) {
  const [recommendations, setRecommendations] = useState([]);

  const handleCardClick = async () => {
    try {
      await pushInteractedProduct(id)();
      console.log("Successfully added in interacted product");
    } catch (error) {
      console.error("Error pushing interacted product:", error);
      // Handle error as needed
    }
  };

  return (
    <Card
      component={Link}
      to={`/productDetail/${id}`}
      sx={{
        position: "relative",
        minWidth: 180,
        maxWidth: 190,
        minHeight: 280,
        borderRadius: "15px",
        margin: "30px 0px",
        display: "block", // Make sure the link behaves like a block element
        padding: "10px 0",
        transition: "box-shadow 0.2s ease-in",
        boxShadow: " 0px 5px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: " 0px 10px 25px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={handleCardClick} // Call pushInteractedProduct on card click
    >
      <CardMedia sx={{ height: 140 }} image={imageSrc} title={title} />
      <CardContent>
        <Typography
          fontSize="14px"
          component="div"
          sx={{ fontWeight: 600, position: "absolute", top: "150px" }}
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
        {/* Display recommendations */}
        {recommendations.length > 0 && (
          <Typography fontSize="12px" sx={{ marginTop: "30px" }}>
            <strong>Recommended:</strong> {recommendations.join(", ")}
          </Typography>
        )}
      </CardContent>

      <CardActions
        sx={{ display: "flex", alignItems: "flex-end", marginTop: "15px" }}
      >
        <AddToCartButton productId={id} />
      </CardActions>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <WishlistIconButton productId={id} />
      </Box>
    </Card>
  );
}
