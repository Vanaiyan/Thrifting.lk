import React, { useState, useEffect, useRef } from 'react';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import ProductCard from '../../Components/Admin/ProductCard';
import { Box, Grid, InputBase, IconButton, Paper, GlobalStyles } from "@mui/material";
import { getAllProducts, searchProducts } from '../../Actions/adminActions';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import PagePagination from '../../Components/Admin/Pagination';

const AllProductsPage = ({ adminName, adminAvatar }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const fetchProducts = async (page = 1, query = '') => {
    try {
      let productsData;
      if (query) {
        productsData = await searchProducts(query, page);
      } else {
        productsData = await getAllProducts(page);
      }
      setProducts(productsData.products);
      setTotalPages(productsData.totalPages);
      setCurrentPage(productsData.currentPage);
      // Clear the search text and hide the cursor
      setSearchQuery('');
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
    fetchProducts(currentPage, query);
  }, [location.search, currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/admin/AllProducts?query=${searchQuery}`);
    setCurrentPage(1);
    fetchProducts(1, searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchProducts(value, searchQuery);
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
      <Box sx={{ display: "flex", backgroundColor: "#EFEFEF", minHeight: '100vh', width: '100%' }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarAdmin adminName={adminName} adminAvatar={adminAvatar} />
          <Box sx={{ p: "15px", display: 'flex', gap: { xs: 2, sm: 5, md: 90 } }}>
            <Breadcrumb />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>          
              <Paper
                component="form"
                sx={{ 
                  p: '2px 4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: { xs: 200, sm: 250, md: 300 }, 
                  borderRadius: '20px', 
                  border: '1px solid #ff5003' 
                }}
                onSubmit={handleSearch}
              >
                <IconButton sx={{ p: '10px', color: '#ff5003' }} aria-label="search" type="submit">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, cursor: 'none' }} // Hide cursor
                  placeholder="Search products"
                  inputProps={{ 'aria-label': 'search products' }}
                  value={searchQuery}
                  onChange={handleInputChange}
                  inputRef={inputRef}
                />
              </Paper>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ p: { xs: '10px', md: '15px' } }}>
            {products.map(product => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
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
    </>
  );
}

export default AllProductsPage;
