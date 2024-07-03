import React, { useEffect, useState } from "react";
import { Box, Paper, IconButton } from "@mui/material";
import NavBar from "../../Components/Navigation bar/navigation";
import FilterItem from "../../Components/AllProduct/FilterItem";
import SelectItem from "../../Components/AllProduct/SelectItem";
import ProductCardmd from "../../Components/Cards/ProductCardmd";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../Components/Footer/Footer";

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
  const [productsPerPage] = useState(30); // Number of products per page
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      // console.log("Keyword from URL:", keywordParam);
      setKeyword(keywordParam);
    } else {
      setKeyword("");
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:8000/api/products?page=${currentPage}`;

        const queryParams = [];
        if (keyword) {
          queryParams.push(`keyword=${keyword}`);
        }
        if (category) {
          queryParams.push(`category=${category}`);
        }
        if (minPrice) {
          queryParams.push(`price[gt]=${minPrice}`);
        }
        if (maxPrice) {
          queryParams.push(`price[lt]=${maxPrice}`);
        }

        if (queryParams.length > 0) {
          url += `&${queryParams.join("&")}`;
        }

        const response = await axios.get(url);
        // console.log("Fetched products:", response.data.products);
        setProducts(response.data.products);

        if (response.data.products.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, keyword, category, minPrice, maxPrice]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1); // Reset to the first page when category changes
    navigate(`/product/${category}?keyword=${keyword}&page=1`);
  };

  const handleFilterChange = (minPrice, maxPrice) => {
    setSelectedCategory("");
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setCurrentPage(1); // Reset to the first page when filters change
    navigate(
      `/product?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=1`
    );
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(
      `/product/${category || ""}?keyword=${keyword}&page=${
        currentPage + 1
      }&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    navigate(
      `/product/${category || ""}?keyword=${keyword}&page=${
        currentPage - 1
      }&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
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
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // 5 products per row
          gap: "16px", // Gap between grid items
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
            discount={product.discount}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 8vw",
          gap: "10px",
        }}
      >
        {currentPage > 1 && (
          <IconButton
            color="primary"
            size="small"
            onClick={handlePreviousPage}
            sx={{
              padding: 0,
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: "4px", // Makes it square
              margin: "0 8px", // Adjust as needed for spacing
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box
          sx={{
            fontSize: "1.2rem",
            paddingY: "2px",
            paddingX: "8px",
            border: "1px solid",
            borderColor: "black",
            borderRadius: "4px", // Makes it square
            margin: "0 8px",
          }}
        >
          {currentPage}
        </Box>
        <IconButton
          color="primary"
          size="small"
          onClick={handleNextPage}
          disabled={products.length === 0}
          sx={{
            padding: 0,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: "4px", // Makes it square
            margin: "0 8px", // Adjust as needed for spacing
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Footer style={{ width: "100%" }} />
    </Box>
  );
};

export default ProductMain;
