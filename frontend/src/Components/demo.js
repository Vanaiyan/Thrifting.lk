import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

export const Demo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      //   const response = await axios.get(`${process.env.PORT}/api/products`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Effect is running");
    fetchProducts();
  }, []);

  return (
    <Box sx={{}}>
      <div>
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </Box>
  );
};
