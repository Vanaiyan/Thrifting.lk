import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import axios from "axios"; // Assuming you use axios for HTTP requests

const OrderManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/myproducts/662ba6ddffd7af4f4a7fd633"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductStatus = async (productId) => {
    try {
      console.log("productId");

      console.log(productId);
      await axios.put(`http://localhost:8000/api/myproducts/${productId}`);
      setProducts(
        products.map((product) =>
          product._id === productId
            ? { ...product, status: !product.status }
            : product
        )
      );
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>

                  <TableCell>
                    {!product.status ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleProductStatus(product._id)}
                      >
                        Not Sold
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleProductStatus(product._id)}
                      >
                        Sold
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderManagement;
