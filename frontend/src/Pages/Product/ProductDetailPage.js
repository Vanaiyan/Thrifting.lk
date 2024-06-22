// src/Pages/ProductDetailPage.js
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Navigation bar/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductImagesBox from "../../Components/ProductdetailPage/ProductImagesBox";
import ProductDetailBox from "../../Components/ProductdetailPage/ProductDetailBox";
import ProductDescriptionBox from "../../Components/ProductdetailPage/ProductDescriptionBox";
import ProductSellerDetailBox from "../../Components/ProductdetailPage/ProductSellerDetailBox";
import { fetchProductDetails } from "../../Actions/homeProductActions";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get productId from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <Container>
          <Box
            id="One"
            display="grid"
            gridTemplateRows="auto auto"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={4}
            padding={4}
            borderRadius={1}
            height={1080}
            sx={{
              bgcolor: "##FFFFFF",
              border: "1px solid gray",
              boxSizing: "border-box",
            }}
          >
            <Box>
              <ProductImagesBox images={product.pictures} />
            </Box>
            <Box>
              <ProductDetailBox product={product} />
            </Box>

            <Box>
              <ProductDescriptionBox description={product.description} />
            </Box>
            <Box>
              <ProductSellerDetailBox sellerId={product.seller} />
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ProductDetailPage;
