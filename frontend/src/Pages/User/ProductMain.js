import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import NavBar from "../../Components/Navigation bar/navigation";
import FilterItem from "../../Components/AllProduct/FilterItem";
import SelectItem from "../../Components/AllProduct/SelectItem";
import ProductCardmd from "../../Components/Cards/ProductCardmd";
import {
  fetchProductsAll,
  fetchProductsByCategory,
  fetchProductsByFilter,
  fetchProductsByKeyword,
} from "../../Actions/homeProductActions";

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchKeyword(keyword);
    }
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      fetchProductsByKeyword(searchKeyword).then((products) => {
        setProducts(products);
      });
    } else {
      fetchAllProducts();
    }
  }, [searchKeyword]);

  const fetchAllProducts = async () => {
    try {
      const products = await fetchProductsAll();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategoryProducts = async (category) => {
    try {
      const products = await fetchProductsByCategory(category);
      setProducts(products);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  };

  const fetchFilteredProducts = async (minPrice, maxPrice) => {
    try {
      const products = await fetchProductsByFilter(minPrice, maxPrice);
      setProducts(products);
    } catch (error) {
      console.error(`Error fetching products with filters:`, error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMinPrice("");
    setMaxPrice("");
  };

  const handleFilterChange = (minPrice, maxPrice) => {
    setSelectedCategory("");
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  return (
    <Box>
      <NavBar />
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          m: "10px 8vw",
          bgcolor: "white",
          borderRadius: "7px",
        }}
      >
        <SelectItem onCategoryChange={handleCategoryChange} />
        <FilterItem onFilterChange={handleFilterChange} />
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          overflow: "hidden",
          padding: { lg: " 2vw", md: "1.8vw", sm: "1vw", xs: "1vw" },
          margin: { lg: "0 6vw", md: "0 3vw", sm: "0 0.5vw", xs: "0 0.3vw" },
        }}
      >
        {products.map((product) => (
          <ProductCardmd
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageSrc={
              product.pictures && product.pictures.length > 0
                ? product.pictures[0].image
                : ""
            } // onAddToCartClick={() => {
            //   // console.log(`Product ${product.name} added to cart`);
            // }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductMain;
