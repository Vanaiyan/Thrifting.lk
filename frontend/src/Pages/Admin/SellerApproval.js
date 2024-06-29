import React, { useEffect, useState } from 'react';
import { Box, Grid, GlobalStyles } from '@mui/material';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import SellerApprovalCard from '../../Components/Admin/SellerApprovalCard';
import { getSellers } from '../../Actions/adminActions';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import PagePagination from '../../Components/Admin/Pagination'; 

const SellerApproval = () => {
  const [sellers, setSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 page

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getSellers(currentPage); // Adjust limit as per your backend pagination
        if (response.success) {
          setSellers(response.sellers);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, [currentPage]); // Fetch sellers whenever currentPage changes

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <GlobalStyles styles={{
        'html, body': {
          backgroundColor: '#EFEFEF',
          margin: 0,
          padding: 0,
          height: '100%',
        }
      }} />

      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#EFEFEF" }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBarAdmin />
          <Box sx={{ p: "15px", flex: 1 }}>
            <Breadcrumb />
            <Grid container spacing={2} sx={{ mt: '15px' }}>
              {sellers.map(seller => (
                <Grid item key={seller.id} xs={12} sm={6} md={4} lg={3}>
                  <SellerApprovalCard seller={seller} />
                </Grid>
              ))}
            </Grid>
            <PagePagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SellerApproval;
