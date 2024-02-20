import React from "react";
import { Products } from "../Products";
import { Box } from "@mui/material";
import ProductCardlg from "../Cards/Productcardlg";

const RecProducts = () => {
  const maxProductsToShow = 18;
  const limitedProducts = Products.slice(0, maxProductsToShow);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "15px 5px",
        overflow: "hidden",
        padding: { lg: "2vw", md: "1.8vw", sm: "1vw", xs: "1vw" },
        margin: { lg: "0 6vw", md: "0 3vw", sm: "0 0.5vw", xs: "0 0.3vw" },
      }}
    >
      {limitedProducts.map((product) => (
        <ProductCardlg
          key={product.id}
          title={product.title}
          price={product.price}
          imageSrc={product.imageSrc}
        />
      ))}
    </Box>
  );
};

export default RecProducts;
