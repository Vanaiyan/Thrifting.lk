import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import axios from 'axios';

const OrderGraph = () => {
  const [data, setData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('Monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedInterval === 'Monthly') {
          const response = await axios.get('http://localhost:8000/api/order-count-last-six-months');
          setData(response.data);
        } else if (selectedInterval === 'Weekly') {
          const response = await axios.get('http://localhost:8000/api/order-count-last-six-weeks');
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };

    fetchData();
  }, [selectedInterval]);

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF5F0',
      }}
    >
      <Typography variant="h6" gutterBottom>Total Order Graph</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        {['Monthly', 'Weekly'].map((label, index) => (
          <Button
            key={index}
            variant={selectedInterval === label ? 'contained' : 'outlined'}
            sx={{ margin: 0.5, backgroundColor: selectedInterval === label ? '#f44336' : 'transparent' }}
            onClick={() => handleIntervalChange(label)}
          >
            {label}
          </Button>
        ))}
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value={selectedInterval === 'Monthly' ? 'Month' : 'Week'} 
            position="insideBottomRight" offset={-5} style={{ fontWeight: 'bold' }} />
          </XAxis>
          <YAxis>
            <Label value="Total Orders" angle={-90} position="insideLeft" offset={10} style={{ fontWeight: 'bold' }} />
          </YAxis>
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#f44336" fill="#f44336" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default OrderGraph;
