import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getSuggestionAction } from "../../Actions/homeProductActions";
import ProductCardmd from "../Cards/ProductCardmd";
import { useSelector, useDispatch } from "react-redux";

const RecProducts = () => {
  const user = useSelector((state) => state.auth.user);
  const [suggestProducts, setSuggestProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await dispatch(
          getSuggestionAction(user ? user._id : "")
        );
        const reversedProducts = response.slice().reverse().slice(0, 15);
        setSuggestProducts(reversedProducts);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [user, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "15px 5px",
        margin: { lg: "0 7vw", md: "0 2vw", sm: "0 0.5vw", xs: "0 0.3vw" },
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // 5 products per row
        // gap: "16px", // Gap between grid items
      }}
    >
      {suggestProducts.map((product) => (
        <ProductCardmd
          key={product._id}
          id={product._id}
          title={product.name}
          price={product.price}
          imageSrc={
            product.pictures && product.pictures.length > 0
              ? product.pictures[0].image
              : ""
          }
        />
      ))}
    </Box>
  );
};

export default RecProducts;
