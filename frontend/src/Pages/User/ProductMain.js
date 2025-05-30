import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCards from "../../Components/AllProduct/ProductCards";
import { Box } from "@mui/material";
import NavBar from "../../Components/Navigation bar/navigation";
import SelectItem from "../../Components/AllProduct/SelectItem";

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch all products from backend when component mounts
    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch products based on selected category when it changes
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get("http://localhost:8000/api/products", {
        params: {
          category: category,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      //console.error(Error fetching products for category ${category}:, error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box>
      <NavBar />
      <SelectItem onCategoryChange={handleCategoryChange} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          overflow: "hidden",
          padding: { lg: "2vw", md: "1.8vw", sm: "1vw", xs: "1vw" },
          margin: { lg: "0 6vw", md: "0 3vw", sm: "0 0.5vw", xs: "0 0.3vw" },
        }}
      >
        {products.map((product) => (
          <ProductCards
            key={product._id}
            title={product.name}
            price={product.price}
             //imageSrc={product.image}
            onAddToCartClick={() => {
              //console.log(Product ${product.name} added to cart);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductMain;