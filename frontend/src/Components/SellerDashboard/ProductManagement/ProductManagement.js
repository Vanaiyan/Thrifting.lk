import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Product from "./Product";
import axios from "axios";
import addimg from "../../../Assets/Images/sellerDashboard/add.png";
import { useNavigate } from "react-router-dom";

const ProductManagement = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (isAuthenticated) {
      navigate(`/seller/dashboard/addProduct`);
    } else {
      setSnackbar({
        open: true,
        message: "You need to be authenticated to add products",
        severity: "warning",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`,
          { withCredentials: true }
        );
        const availableProducts = response.data.filter(
          (product) => !product.status
        );
        setProducts(availableProducts);

        const authResponse = await axios.get(
          `http://localhost:8000/api/authenticate/${sellerId}`,
          { withCredentials: true }
        );
        // console.log(authResponse.data.authenticatedStatus);
        setIsAuthenticated(authResponse.data.authenticatedStatus);

        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching products or checking authentication:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          width: 200,
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          disabled={null}
        >
          Add Product
        </Button>
      </Grid>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {products.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                height: "70vh",
              }}
            >
              <img
                src={addimg}
                alt="add new product"
                style={{
                  width: "700px",
                  height: "500px",
                  transform: "scaleX(-1)",
                }}
              />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imageSrcs={product.pictures?.map(
                      (picture) => picture.image
                    )}
                    description={product.description}
                    discount={product.discount}
                    setProducts={setProducts}
                    setSnackbar={setSnackbar}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductManagement;
