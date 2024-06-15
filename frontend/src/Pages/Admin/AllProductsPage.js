import React, { useState, useEffect } from 'react';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import ProductCard from '../../Components/Admin/ProductCard';
import { Box, Grid } from "@mui/material";
import { getAllProducts } from '../../Actions/adminActions'; // Import the API function

const AllProductsPage = ({ adminName, adminAvatar }) => {
  const [products, setProducts] = useState([]); // why use adminName,adminAvatar?

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        {/* <AppBarAdmin adminName={adminName} adminAvatar={adminAvatar} /> */}
        <AppBarAdmin />
        <Grid container spacing={2} sx={{ p: "15px" }}>
          {products.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AllProductsPage;
