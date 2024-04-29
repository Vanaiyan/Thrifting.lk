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
        const response = await axios.get("http://localhost:8000/api/myproducts/662ba6ddffd7af4f4a7fd633");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
     console.log("productId");

      console.log(productId);
      await axios.delete(`http://localhost:8000/api/myproducts/${productId}`);

      setProducts(products.filter(product => product._id !== productId));
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.status ? "Sold" : "Not Sold"}</TableCell>
                  <TableCell>
                    {!product.status ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      "N/A"
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
