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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword(""); // Reset search keyword if not present
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchKeyword) {
          console.log("Fetching products by keyword:", searchKeyword);
          const products = await fetchProductsByKeyword(searchKeyword);
          console.log("Fetched products by keyword:", products);
          setProducts(products);
        } else if (category) {
          console.log("Fetching products by category:", category);
          const products = await fetchProductsByCategory(category);
          console.log("Fetched products by category:", products);
          setProducts(products);
        } else {
          console.log("Fetching all products");
          const products = await fetchProductsAll();
          console.log("Fetched all products:", products);
          setProducts(products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchKeyword, category]);

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
    navigate(`/product/${category}`);
  };

  const handleFilterChange = (minPrice, maxPrice) => {
    setSelectedCategory("");
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    fetchFilteredProducts(minPrice, maxPrice);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
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
          padding: { lg: "2vw", md: "1.8vw", sm: "1vw", xs: "1vw" },
          margin: { lg: "0 6vw", md: "0 3vw", sm: "0 0.5vw", xs: "0 0.3vw" },
          flex: "1 0 auto", // Ensure this box grows to fill available space
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
            }
          />
        ))}
      </Box>
      <Footer style={{ width: '100px' }} />
    </Box>
  );
};

export default ProductMain;
