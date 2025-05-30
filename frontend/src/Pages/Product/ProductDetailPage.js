// ProductDetailPage.js
import React from 'react';
import NavBar from '../../Components/Navigation bar/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProductImagesBox from '../../Components/ProductdetailPage/ProductImagesBox';
import ProductDetailBox from '../../Components/ProductdetailPage/ProductDetailBox';
import ProductDescriptionBox from '../../Components/ProductdetailPage/ProductDescriptionBox';
import ProductSellerDetailBox from '../../Components/ProductdetailPage/ProductSellerDetailBox';

const ProductDetailPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px'}}>
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
            sx={{ bgcolor: '##FFFFFF', border: '1px solid gray', boxSizing: 'border-box' }}
          >
            <Box>
              <ProductImagesBox />
            </Box>
            <Box>
              <ProductDetailBox />
            </Box>

            <Box>
              <ProductDescriptionBox />
            </Box>
            <Box>
              <ProductSellerDetailBox />
            </Box>

          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ProductDetailPage;