import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Typography
} from '@mui/material';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import { getOrderList } from '../../Actions/adminActions';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrderList();
        setOrders(ordersData);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchOrders();
  }, []);

  const getAvatarContent = (name, avatar) => {
    if (avatar) {
      return <Avatar alt={name} src={avatar} />;
    } else {
      const firstLetter = name.charAt(0);
      return <Avatar>{firstLetter}</Avatar>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Grid sx={{ p: "20px" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Recent Purchases</Typography>
          <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox /> */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Seller Name</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center"sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'black',
                          display: 'inline-block'
                        }}
                      />
                    </TableCell>
                    <TableCell >{order.productName}</TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {getAvatarContent(order.userName, order.userAvatar)}
                        <Typography variant="body2" component="span" sx={{ marginLeft: '10px' }}>
                          {order.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                      {getAvatarContent(order.sellerName, order.sellerAvatar)}
                        <Typography variant="body2" component="span" sx={{ marginLeft: '10px' }}>
                          {order.sellerName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          color: 'green', // Customize this based on your order status
                        }}
                      >
                        {/* Assuming status is available in the order data */}
                        {/* {order.status} */}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderList;





