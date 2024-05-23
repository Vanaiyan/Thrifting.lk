// AllProductsPage.js
import React from 'react';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import ProductCard from '../../Components/Admin/ProductCard';
import { Box, Grid } from "@mui/material";

const AllProductsPage = ({ adminName, adminAvatar }) => {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      image: "https://dummyimage.com/200x200/000/fff",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ante vel libero mattis posuere.",
      seller: "Electronics Store"
    },
    {
      id: 2,
      name: "Laptop",
      image: "https://dummyimage.com/200x200/000/fff",
      description: "Vestibulum auctor metus sed quam vehicula, vel tincidunt justo ultricies. Fusce in quam sit amet enim pharetra volutpat nec sit amet est.",
      seller: "Tech Inc."
    },
    {
      id: 3,
      name: "Headphones",
      image: "https://dummyimage.com/200x200/000/fff",
      description: "Integer ac orci sed purus mollis tincidunt non sit amet ligula. Sed non erat et orci condimentum tincidunt at nec justo.",
      seller: "Audio Emporium"
    },
    {
      id: 4,
      name: "Smartwatch",
      image: "https://dummyimage.com/200x200/000/fff",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi nec nisi commodo, rhoncus libero ac, eleifend turpis.",
      seller: "Wearable Tech Store"
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin adminName={adminName} adminAvatar={adminAvatar} />
        <Grid container spacing={2} sx={{p:"15px" }}>
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
