import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, GlobalStyles } from '@mui/material';
import BuyerCard from '../../Components/Admin/BuyerCard';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import { getUsers } from '../../Actions/adminActions'; 
import PagePagination from '../../Components/Admin/Pagination';

const AllUserPage = () => {
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 page

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await getUsers(currentPage); // Adjust limit as per your backend pagination
        if (response.success) {
          setBuyers(response.users);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.error('Error fetching buyers:', error);
      }
    };

    fetchBuyers();
  }, [currentPage]); // Fetch buyers whenever currentPage changes

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

      <Box sx={{ display: 'flex', backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBarAdmin />
          <Box sx={{ p: '15px', flex: 1 }}>
            <Breadcrumb />
            <Container sx={{ p: '15px' }}>
              <Grid container spacing={3}>
                {buyers.map((buyer, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <BuyerCard buyer={buyer} />
                  </Grid>
                ))}
              </Grid>
            </Container>
            {/* Pagination component */}
            <PagePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AllUserPage;
