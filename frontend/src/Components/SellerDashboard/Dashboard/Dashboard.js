import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import FloatingButton from "../../Chat/floatingbutton";
import categories from "../../Data/Category";

const Dashboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`,
          { withCredentials: true }
        );

        const soldItems = response.data.filter((product) => product.status);
        const availableProducts = response.data.filter(
          (product) => !product.status
        );
        setProducts(availableProducts);
        setSoldProducts(soldItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  const getProductCountByMainCategory = (mainCategory) => {
    const categoryProducts = products.filter(
      (product) => product.category[0] === mainCategory
    );
    return categoryProducts.length;
  };

  const handleCategorySelect = (mainCategory) => {
    setSelectedCategory(mainCategory);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">My total Products</Typography>
            <Typography variant="h4">
              {products.length + soldProducts.length}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">Available Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6">Sold Products</Typography>
            <Typography variant="h4">{soldProducts.length}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h5">Categories</Typography>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category.name}
                  button
                  selected={selectedCategory === category.name}
                  onClick={() => handleCategorySelect(category.name)}
                 // classes={{ selected: "Mui-selected" }}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3}>
          <Box
            padding={2}
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <Typography variant="h5">Products in {selectedCategory}</Typography>
            {selectedCategory && (
              <div>
                {products
                  .filter((product) => product.category[0] === selectedCategory)
                  .map((product) => (
                    <Box key={product._id} marginBottom={2}>
                      <Typography variant="body1">{product.name}</Typography>
                    </Box>
                  ))}
                <Box marginTop={2}>
                  <Typography variant="body1">
                    Total: {getProductCountByMainCategory(selectedCategory)}
                  </Typography>
                </Box>
              </div>
            )}
            {!selectedCategory && (
              <Typography variant="body1">
                Please select a category to view products.
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" mt={2}>
          {/* Additional content or actions */}
        </Box>
      </Grid>
      <FloatingButton />
    </Grid>
  );
};

export default Dashboard;
