import React, { useState, useEffect } from "react";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import Product from "./Product";
import axios from "axios";
import addimg from "../../../Assets/Images/sellerDashboard/add.png";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/myproduct/662ba747e59446416eacee2d"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
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
          {products.length === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
              }}
            >
              <img
                src={addimg}
                alt="add new product"
                style={{ width: "800px", height: "500px" }}
              />
            </Box>
          )}

          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id}>
                <Product
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  // imageSrc={product.image}
                  imageSrc="https://images.unsplash.com/photo-1708921047448-389333bac8f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMwOTQ2Mw&ixlib=rb-4.0.3&q=80&w=1080"
                  description={product.description}
                />
              </Grid>
            ))}
          </Grid>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Add product clicked")}
        >
          Add Product
        </Button>
      </Grid>
    </div>
  );
};

export default ProductManagement;
