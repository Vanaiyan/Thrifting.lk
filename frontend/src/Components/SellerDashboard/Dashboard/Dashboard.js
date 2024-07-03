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
          `${process.env.REACT_APP_BACKEND}/api/myproducts/${sellerId}`,
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
          <Box padding={2} sx={{ backgroundColor: "#bcdb6d" }}>
            <Typography variant="h6">My total Products</Typography>
            <Typography variant="h4">
              {products.length + soldProducts.length}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4} md={4}>
        <Paper elevation={3}>
          <Box padding={2} sx={{ backgroundColor: "#68cbfe" }}>
            <Typography variant="h6">Available Products</Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4} md={4}>
        <Paper elevation={3}>
          <Box padding={2} sx={{ backgroundColor: "#bc6cc9" }}>
            <Typography variant="h6">Sold Products</Typography>
            <Typography variant="h4">{soldProducts.length}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Box
            padding={2}
            sx={{ maxHeight: "60vh", backgroundColor: "#f1f1f1" }}
          >
            <Typography variant="h5">Categories</Typography>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category.name}
                  button
                  selected={selectedCategory === category.name}
                  onClick={() => handleCategorySelect(category.name)}
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
            sx={{
              backgroundColor: "#f1f1f1",
              minHeight: "60vh",
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5">Products in {selectedCategory}</Typography>
            {selectedCategory && (
              <Grid sx={{ padding: "20px" }}>
                {products
                  .filter((product) => product.category[0] === selectedCategory)
                  .map((product) => (
                    <Box
                      key={product._id}
                      marginBottom={2}
                      sx={{ backgroundColor: "#fff" }}
                    >
                      <Paper sx={{ height: "35px", padding: "0 10px " }}>
                        <Typography variant="body1">{product.name}</Typography>
                      </Paper>
                    </Box>
                  ))}
                <Box marginTop={2}>
                  <Typography variant="body1">
                    Total: {getProductCountByMainCategory(selectedCategory)}
                  </Typography>
                </Box>
              </Grid>
            )}
            {!selectedCategory && (
              <Typography variant="body1">
                Please select a category to view products.
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
