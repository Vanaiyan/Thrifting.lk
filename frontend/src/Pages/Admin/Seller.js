import React, { useState, useEffect } from 'react';
import { Box, Grid } from "@mui/material";
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import SellerCard from '../../Components/Admin/SellerCard';
import { getAllSellers } from '../../Actions/adminActions';

const AllSellersPage = ({ adminName, adminAvatar }) => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData = await getAllSellers();
        setSellers(sellersData);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  const handleDeleteSeller = (sellerId) => {
    setSellers(sellers.filter(seller => seller._id !== sellerId));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Grid container spacing={2} sx={{ p: "15px" }}>
          {sellers.map(seller => (
            <Grid item key={seller._id} xs={12} sm={6} md={4}>
              <SellerCard seller={seller} onDelete={handleDeleteSeller} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AllSellersPage;
