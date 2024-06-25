// // src/components/SaleGraph.js
// import React from 'react';
// import { Paper, Typography, Box, Button } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'JUL', uv: 50 },
//   { name: 'AUG', uv: 30 },
//   { name: 'SEP', uv: 20 },
//   { name: 'OCT', uv: 70 },
//   { name: 'NOV', uv: 110 },
//   { name: 'DEC', uv: 160 },
// ];

// const SaleGraph = () => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Typography variant="h6" gutterBottom>Sale Graph</Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
//         {['WEEKLY', 'MONTHLY', 'YEARLY'].map((label, index) => (
//           <Button key={index} variant={label === 'MONTHLY' ? 'contained' : 'outlined'} color="primary" sx={{ margin: 0.5 }}>
//             {label}
//           </Button>
//         ))}
//       </Box>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="uv" stroke="#f44336" />
//         </LineChart>
//       </ResponsiveContainer>
//     </Paper>
//   );
// };

// export default SaleGraph;



// src/components/SaleGraph.js

import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SaleGraph = () => {
  const [data, setData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('MONTHLY');

  const fetchOrderCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/order-count-last-six-months');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  useEffect(() => {
    fetchOrderCount();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>Sale Graph</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        {['WEEKLY', 'MONTHLY', 'YEARLY'].map((label, index) => (
          <Button key={index} variant={label === selectedInterval ? 'contained' : 'outlined'} color="primary" sx={{ margin: 0.5 }}>
            {label}
          </Button>
        ))}
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#f44336" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SaleGraph;
