import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import SellerCard from '../../Components/Admin/SellerCard';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { getApprovedSellers, searchSellers } from '../../Actions/adminActions';

const AllSellersPage = ({ adminName, adminAvatar }) => {
  const [sellers, setSellers] = useState([]);
  const [query, setQuery] = useState('');
  const [sellerId, setSellerId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';
        const sellerId = searchParams.get('sellerId') || '';

        if (query || sellerId) {
          const sellersData = await searchSellers({ query, sellerId });
          setSellers(sellersData);
        } else {
          const sellersData = await getApprovedSellers();
          setSellers(sellersData);
        }
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, [location.search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = { query, sellerId };
      const sellersData = await searchSellers(params);
      setSellers(sellersData);

      // Update the URL with search parameters
      const searchParams = new URLSearchParams(params).toString();
      navigate(`/admin/Sellers?${searchParams}`);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDeleteSeller = (sellerId) => {
    setSellers(sellers.filter(seller => seller._id !== sellerId));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{ p: "15px", display: 'flex', gap: 80 }}>
          <Breadcrumb />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '20px' }}
              onSubmit={handleSearch}
            >
              <IconButton sx={{ p: '10px', color: '#ff5003' }} aria-label="search" type="submit">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by seller ID"
                inputProps={{ 'aria-label': 'search by seller ID' }}
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
              />
            </Paper>
          </Box>
        </Box>
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





