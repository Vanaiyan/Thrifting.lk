import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ProductCardsm from "../Cards/ProductCardsm";

const MoreProductBox = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`,
          { withCredentials: true }
        );
        const availableProducts = response.data.filter(
          (product) => !product.status
        );
        setProducts(shuffleArray(availableProducts).slice(0, 50));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", overflowX: "auto", padding: 2, gap: 2 }}>
      {products.length > 0 ? (
        products.map((product) => (
          <Box key={product.id} sx={{ minWidth: 200 }}>
            <ProductCardsm
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
          </Box>
        ))
      ) : (
        <Typography variant="h6" sx={{ margin: "0 auto" }}>
          No products available from this seller.
        </Typography>
      )}
    </Box>
  );
};

export default MoreProductBox;
