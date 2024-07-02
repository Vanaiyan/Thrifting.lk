import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import axios from "axios";

const OrderManagement = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [showStatusOptions, setShowStatusOptions] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/orderManage/${sellerId}`,
          { withCredentials: true }
        );
        const productsWithBuyers = response.data.map(product => ({
          ...product,
          buyer: `${product.buyer.firstName} ${product.buyer.lastName}`
        }));
        setProducts(productsWithBuyers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const handleProductStatus = async (productId) => {
    const status = selectedStatus[productId];
    const endpoint = `http://localhost:8000/api/myproducts/changeSoldStatus/${productId}`;

    try {
      await axios.put(
        endpoint,
        { status: status === "sold", sellerId },
        { withCredentials: true }
      );
      setProducts(
        products.map((product) =>
          product._id === productId ? { ...product, status: status === "sold" } : product
        )
      );
    } catch (error) {
      console.error("Error changing product status:", error);
    }

    setShowStatusOptions((prev) => ({ ...prev, [productId]: false }));
  };

  const toggleStatusOptions = (productId) => {
    setShowStatusOptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleStatusChange = (productId, status) => {
    setSelectedStatus((prev) => ({ ...prev, [productId]: status }));
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
                <TableCell>Buyer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price - product.discount}</TableCell>
                  <TableCell>
                    {product.buyer }
                  </TableCell>
                  <TableCell>
                    {product.status ? "Sold" : "Not Sold"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => toggleStatusOptions(product._id)}
                    >
                      {showStatusOptions[product._id] ? "Cancel" : "Change Status"}
                    </Button>
                    {showStatusOptions[product._id] && (
                      <div>
                        <RadioGroup
                          row
                          value={selectedStatus[product._id] || (product.status ? "sold" : "not_sold")}
                          onChange={(e) =>
                            handleStatusChange(
                              product._id,
                              e.target.value
                            )
                          }
                        >
                          <FormControlLabel
                            value="not_sold"
                            control={<Radio color="primary" />}
                            label="Not Sold"
                          />
                          <FormControlLabel
                            value="sold"
                            control={<Radio color="primary" />}
                            label="Sold"
                          />
                        </RadioGroup>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleProductStatus(product._id)}
                        >
                          Submit
                        </Button>
                      </div>
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
