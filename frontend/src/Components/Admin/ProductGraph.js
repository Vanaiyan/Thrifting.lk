import React, { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const ProductGraph = () => {
  const [data, setData] = useState([]);
  // const [selectedInterval, setSelectedInterval] = useState('MONTHLY');

  const fetchProductPrice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/price-count-last-six-months`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product prices:", error);
    }
  };

  useEffect(() => {
    fetchProductPrice();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFF0F5",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Total Product Prices Graph
      </Typography>
      <Typography variant="h6" gutterBottom>
        Monthly Data
      </Typography>

      <ResponsiveContainer width="100%" height={410}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Month",
              position: "insideBottomRight",
              offset: -5,
              fontWeight: "bold",
            }}
          />
          <YAxis
            label={{
              value: "Total Price ($)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fontWeight: "bold",
            }}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#C71585" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ProductGraph;
