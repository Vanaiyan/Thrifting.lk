import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

const Dashboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`
        );

        const soldItem = response.data.filter((product) => product.status);

        const availableProducts = response.data.filter(
          (product) => !product.status
        );
        setProducts(availableProducts);
        setSoldProducts(soldItem);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">My total Products</Typography>
            <Typography variant="h4">{products.length + soldProducts.length }</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6"> Available Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">Sold Products</Typography>

            <Typography variant="h4">{soldProducts.length}</Typography>
            {/* Add sold products component here */}
          </Box>
        </Paper>
      </Grid>
    
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">Orders</Typography>
            
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
