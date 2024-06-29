import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ProductGraph = () => {
  const [data, setData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('MONTHLY');

  const fetchProductCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product-count-last-six-months');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  useEffect(() => {
    fetchProductCount();
  }, []);

  const handleMonthlyClick = async () => {
    setSelectedInterval('MONTHLY');
    try {
      const response = await axios.get('http://localhost:8000/api/product-count-last-six-months');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
      }}
    >
      <Typography variant="h5" gutterBottom>Total Products Sold Graph</Typography>
      <Typography variant="h6" gutterBottom>Monthly Data</Typography>
      
      {/* <Button
        onClick={handleMonthlyClick}
        variant="contained"
        sx={{ marginBottom: '1rem',backgroundColor: '#C71585' }} 
      >
        Show Monthly Data
      </Button> */}

      <ResponsiveContainer width="100%" height={410}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottomRight', offset: -5, fontWeight: 'bold' }} />
          <YAxis label={{ value: 'Total Products', angle: -90, position: 'insideLeft', offset: 10, fontWeight: 'bold' }} />
          <Tooltip />
          <Bar dataKey="count" fill="#C71585" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ProductGraph;
