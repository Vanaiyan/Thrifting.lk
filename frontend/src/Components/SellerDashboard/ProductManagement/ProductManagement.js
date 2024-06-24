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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(`/seller/dashboard/addProduct`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`
        );
        const availableProducts = response.data.filter(
          (product) => !product.status
        );

        setProducts(availableProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
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
                height: "60vh",
              }}
            >
              <img
                src={addimg}
                alt="add new product"
                style={{
                  width: "800px",
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
                    imageSrcs={
                      product.pictures?.map((picture) => picture.image) || [
                        "https://images.unsplash.com/photo-1708921047448-389333bac8f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMwOTQ2Mw&ixlib=rb-4.0.3&q=80&w=1080",
                      ]
                    }
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
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Grid>
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
