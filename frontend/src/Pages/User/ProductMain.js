import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCards from "../../Components/AllProduct.js/ProductCards";
import { Box } from "@mui/material";
import { SelectItem } from "../../Components/AllProduct.js/SelectItem";
import NavBar from "../../Components/Navigation bar/navigation";

const ProductMain = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      console.log(response);
      const productsValue = response.data.products;
      // Assuming the response data is an array of products
      setProducts(productsValue);
      console.log(response.data.products);
      console.log(productsValue);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();



  return (
    <Box>
      <NavBar />
      <SelectItem />

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
         {/* {products.map((product) => (
          <ProductCards
            key={product._id}
            title={product.name}
            price={product.price}
           // imageSrc={product.imageSrc}
            onAddToCartClick={() => {
              console.log(`Product ${product.id} added to cart`);
            }}
          />
        ))}  */}
      </Box>
    </Box>
  );
};

export default ProductMain;
