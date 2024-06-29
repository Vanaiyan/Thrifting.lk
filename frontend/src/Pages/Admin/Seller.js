import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, IconButton, InputBase, Paper, GlobalStyles } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import SellerCard from '../../Components/Admin/SellerCard';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { getApprovedSellers, searchSellers } from '../../Actions/adminActions';
import PagePagination from '../../Components/Admin/Pagination';

const AllSellersPage = ({ adminName, adminAvatar }) => {
  const [sellers, setSellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';

        if (query) {
          const sellersData = await searchSellers(query, currentPage);
          setSellers(sellersData.sellers || []);
          setTotalPages(sellersData.totalPages || 0);
        } else {
          const sellersData = await getApprovedSellers(currentPage);
          setSellers(sellersData.sellers || []);
          setTotalPages(sellersData.totalPages || 0);
        }
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, [location.search, currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const sellersData = await searchSellers(searchQuery, 1); // Reset to first page after search
      setSellers(sellersData.sellers || []);
      setTotalPages(sellersData.totalPages || 0);

      // Update the URL with search parameters
      navigate(`/admin/sellers?query=${searchQuery}`);

      // Clear the search query and blur the input field
      setSearchQuery('');
      if (searchInputRef.current) searchInputRef.current.blur();
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDeleteSeller = (sellerId) => {
    setSellers(sellers.filter(seller => seller._id !== sellerId));
  };

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

      <Box sx={{ display: "flex", backgroundColor: "#EFEFEF", minHeight: '100vh' }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarAdmin adminName={adminName} adminAvatar={adminAvatar} />
          <Box sx={{ p: "15px", display: 'flex', gap: { xs: 2, sm: 5, md: 90 } }}>
            <Breadcrumb />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Paper
                component="form"
                sx={{
                  p: '2px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  width: { xs: 200, sm: 250, md: 300 }, 
                  borderRadius: '20px',
                  border: '1px solid #ff5003',
                }}
                onSubmit={handleSearch}
              >
                <IconButton sx={{ p: '10px', color: '#ff5003' }} aria-label="search" type="submit">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search by name or ID"
                  inputProps={{ 'aria-label': 'search by name or ID' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputRef={searchInputRef}
                />
              </Paper>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ p: { xs: '10px', md: '15px' } }} >
            {sellers.map(seller => (
              <Grid item key={seller._id} xs={12} sm={7} md={4} lg={4}>
                <SellerCard seller={seller} onDelete={handleDeleteSeller} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <PagePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AllSellersPage;
