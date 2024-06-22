import React, { useState, useEffect } from 'react';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import ProductCard from '../../Components/Admin/ProductCard';
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material";
import { getAllProducts, searchProducts } from '../../Actions/adminActions'; // Import the API functions
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';

const AllProductsPage = ({ adminName, adminAvatar }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';

        if (query) {
          const productsData = await searchProducts(query);
          setProducts(productsData);
        } else {
          const productsData = await getAllProducts();
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const productsData = await searchProducts(searchQuery);
      setProducts(productsData);

      // Update the URL with search parameters
      const searchParams = new URLSearchParams({ query: searchQuery }).toString();
      navigate(`/admin/AllProducts?${searchParams}`);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />

        <Box sx={{ p: "15px", display: 'flex', gap: 90 }}>
          <Breadcrumb />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>          
            <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, borderRadius: '20px' }}
            onSubmit={handleSearch}
          >
            <IconButton sx={{ p: '10px', color: '#ff5003' }} aria-label="search" type="submit">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search products"
              inputProps={{ 'aria-label': 'search products' }}
              value={searchQuery}
              onChange={handleInputChange}
            />
          </Paper>
          </Box>
        </Box>
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







