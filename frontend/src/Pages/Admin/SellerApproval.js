// SellerApprovalPage.js
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import SellerApprovalCard from '../../Components/Admin/SellerApprovalCard';
import { getSellers } from '../../Actions/adminActions';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';

const SellerApproval = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersData = await getSellers();
        setSellers(sellersData);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{p: "15px"}}>
        <Breadcrumb/>
        </Box>
        <Grid container spacing={2} sx={{ p: '15px' }}>
          {sellers.map(seller => (
            <Grid item key={seller.id} xs={12} sm={4} md={3}>
              <SellerApprovalCard seller={seller} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default SellerApproval;
