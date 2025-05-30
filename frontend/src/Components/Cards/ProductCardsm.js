import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import AddToCartButton from "../Cart/AddtoCartBtn";

export default function ProductCardsm({ id, title, price, imageSrc }) {
  return (
    <Card
      sx={{
        position: "relative",
        minWidth: 180,
        maxWidth: 190,
        minHeight: 280,
        borderRadius: "15px",
        margin: "30px 0px",
        padding: "10px 0",
        transition: "box-shadow 0.2s ease-in",
        boxShadow: " 0px 5px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: " 0px 10px 25px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={imageSrc} title={title} />
      <CardContent>
        <Typography
          fontSize="14px"
          component="div"
          sx={{ fontWeight: 600, position: "absolute", top: "150px" }}
        >
          {title}Original Beats Solo Pro
        </Typography>
        <Typography
          fontSize="14px"
          color="text.secondary"
          sx={{ position: "absolute", top: "210px" }}
        >
          Price: {price}
        </Typography>
      </CardContent>

      <CardActions
        sx={{ display: "flex", alignItems: "flex-end", marginTop: "15px" }}
      >
        <AddToCartButton productId={id} />
      </CardActions>
    </Card>
  );
}
