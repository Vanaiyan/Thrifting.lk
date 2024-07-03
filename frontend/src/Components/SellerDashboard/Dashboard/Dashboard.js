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
import categories from "../../Data/Category";

const InfoBox = ({ title, value, color }) => {
  return (
    <Paper elevation={1} sx={{borderRadius:"20px"}}>
      <Box padding={1} sx={{ backgroundColor: color, color:"#000",borderRadius:"20px",textAlign:"center" }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Paper>
  );
};

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
      <Grid item xs={12} md={4}>
        <InfoBox
          title="My Total Products"
          value={products.length + soldProducts.length}
          color="#bcdb6d"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoBox
          title="Available Products"
          value={products.length}
          color="#68cbfe"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoBox
          title="Sold Products"
          value={soldProducts.length}
          color="#bc6cc9"
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper elevation={3} sx={{borderRadius:"20px"}}>
          <Box
            padding={2}
            sx={{ maxHeight: "60vh", backgroundColor: "#ffdccd" , color:"#000",borderRadius:"20px"}}
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
      <Grid item xs={6} md={8}>
        <Paper elevation={3} sx={{borderRadius:"20px"}}>
          <Box
            padding={2}
            sx={{
              minHeight: "60vh",
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              borderRadius:"20px",
              //   ffff80 ffdccd ff9668
              backgroundColor: "#ffdccd"
            }}
          >
            <Typography variant="h5">Available Products in {selectedCategory}</Typography>
            {selectedCategory && (
              <Grid sx={{ padding: "20px" }}>
                {products
                  .filter((product) => product.category[0] === selectedCategory)
                  .map((product) => (
                    <Box
                      key={product._id}
                      marginBottom={2}
                      sx={{ backgroundColor: "#fff",borderRadius:"10px" }}
                    >
                      <Paper sx={{  padding: "10px 20px ",backgroundColor:"#ffff80",borderRadius:"10px" }}>
                        <Typography variant="body1">{product.name}</Typography>
                      </Paper>
                    </Box>
                  ))}
                <Box marginTop={2} sx={{backgroundColor:"#fff",padding:"10px 20px",backgroundColor:"#ffff80",borderRadius:"10px"}}>
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
