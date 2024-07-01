// import React, { useEffect, useState } from "react";
// import { Box, Paper } from "@mui/material";
// import NavBar from "../../Components/Navigation bar/navigation";
// import FilterItem from "../../Components/AllProduct/FilterItem";
// import SelectItem from "../../Components/AllProduct/SelectItem";
// import ProductCardmd from "../../Components/Cards/ProductCardmd";
// import {
//   fetchProductsAll,
//   fetchProductsByCategory,
//   fetchProductsByFilter,
//   fetchProductsByKeyword,
// } from "../../Actions/homeProductActions";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import Footer from "../../Components/Footer/Footer";

// const ProductMain = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const navigate = useNavigate();
//   const { category } = useParams();
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const keyword = searchParams.get("keyword");
//     if (keyword) {
//       setSearchKeyword(keyword);
//     } else {
//       setSearchKeyword(""); // Reset search keyword if not present
//     }
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         if (searchKeyword) {
//           console.log("Fetching products by keyword:", searchKeyword);
//           const products = await fetchProductsByKeyword(searchKeyword);
//           console.log("Fetched products by keyword:", products);
//           setProducts(products);
//         } else if (category) {
//           console.log("Fetching products by category:", category);
//           const products = await fetchProductsByCategory(category);
//           console.log("Fetched products by category:", products);
//           setProducts(products);
//         } else {
//           console.log("Fetching all products");
//           const products = await fetchProductsAll();
//           console.log("Fetched all products:", products);
//           setProducts(products);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [searchKeyword, category]);

//   const fetchFilteredProducts = async (minPrice, maxPrice) => {
//     try {
//       const products = await fetchProductsByFilter(minPrice, maxPrice);
//       setProducts(products);
//     } catch (error) {
//       console.error(`Error fetching products with filters:`, error);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setMinPrice("");
//     setMaxPrice("");
//     navigate(`/product/${category}`);
//   };

//   const handleFilterChange = (minPrice, maxPrice) => {
//     setSelectedCategory("");
//     setMinPrice(minPrice);
//     setMaxPrice(maxPrice);
//     fetchFilteredProducts(minPrice, maxPrice);
//   };

//   return (
//     <Box display="flex" flexDirection="column" minHeight="100vh">
//       <NavBar />
//       <Paper
//         elevation={1}
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           m: "10px 8vw",
//           bgcolor: "white",
//           borderRadius: "7px",
//         }}
//       >
//         <SelectItem onCategoryChange={handleCategoryChange} />
//         <FilterItem onFilterChange={handleFilterChange} />
//       </Paper>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(5, 1fr)", // 5 products per row
//           gap: "16px", // Gap between grid items
//           padding: { lg: "2vw", md: "1.8vw", sm: "1vw", xs: "1vw" },
//           margin: { lg: "0 6vw", md: "0 3vw", sm: "0 0.5vw", xs: "0 0.3vw" },
//           flex: "1 0 auto", // Ensure this box grows to fill available space
//         }}
//       >
//         {products.map((product) => (
//           <ProductCardmd
//             key={product._id}
//             id={product._id}
//             title={product.name}
//             price={product.price}
//             imageSrc={
//               product.pictures && product.pictures.length > 0
//                 ? product.pictures[0].image
//                 : ""
//             }
//           />
//         ))}
//       </Box>
//       <Footer style={{ width: '100px' }} />
//     </Box>
//   );
// };

// export default ProductMain;


import React, { useEffect, useState } from "react";
import { Box, Paper, Button } from "@mui/material";
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
  const [productsToShow, setProductsToShow] = useState(10); // Number of products to show initially
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
        let fetchedProducts = [];
        if (searchKeyword) {
          console.log("Fetching products by keyword:", searchKeyword);
          fetchedProducts = await fetchProductsByKeyword(searchKeyword);
        } else if (category) {
          console.log("Fetching products by category:", category);
          fetchedProducts = await fetchProductsByCategory(category);
        } else {
          console.log("Fetching all products");
          fetchedProducts = await fetchProductsAll();
        }
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchKeyword, category]);

  const fetchFilteredProducts = async (minPrice, maxPrice) => {
    try {
      const filteredProducts = await fetchProductsByFilter(minPrice, maxPrice);
      setProducts(filteredProducts);
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

  const handleShowMore = () => {
    setProductsToShow(prevCount => prevCount + 10); // Increase products to show by 10
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
        {products.slice(0, productsToShow).map((product) => (
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
      {productsToShow < products.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: '20px' }}>
          <Button variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
      <Footer style={{ width: '100%' }} /> {/* Ensure footer takes full width */}
    </Box>
  );
};

export default ProductMain;
