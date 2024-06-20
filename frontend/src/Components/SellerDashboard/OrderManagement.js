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
import axios from "axios"; 

const OrderManagement = ({sellerId}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const handleProductStatus = async (productId) => {
    try {
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
                  <TableCell>{product.price - product.discount}</TableCell>

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
