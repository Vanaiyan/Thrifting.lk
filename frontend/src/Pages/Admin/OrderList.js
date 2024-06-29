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
  Avatar,
  Typography,
  TableFooter,
  TablePagination,
  GlobalStyles,
} from '@mui/material';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import { getOrderList } from '../../Actions/adminActions';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableContainerHeight = 500;

  const fetchOrders = async (page, limit) => {
    try {
      const ordersData = await getOrderList(page, limit);
      setOrders(ordersData.orders);
      setTotalRows(ordersData.totalCount);
    } catch (error) {
      console.error('There was an error fetching the orders!', error);
    }
  };

  useEffect(() => {
    fetchOrders(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRandomColor = () => {
    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
      '#ffc107',
      '#ff9800',
      '#ff5722',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getAvatarContent = (name, avatar) => {
    if (avatar) {
      return <Avatar alt={name} src={avatar} sx={{ width: 25, height: 25 }} />;
    } else if (name !== 'Unknown') {
      const firstLetter = `${name.charAt(0).toUpperCase()}`;
      const backgroundColor = getRandomColor();
      return (
        <Avatar sx={{ bgcolor: backgroundColor, width: 25, height: 25 }}>
          {firstLetter}
        </Avatar>
      );
    } else {
      return (
        <Avatar sx={{ width: 40, height: 40 }}>
          ?
        </Avatar>
      );
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          'html, body': {
            backgroundColor: '#EFEFEF',
            margin: 0,
            padding: 0,
            height: '100%',
          },
        }}
      />

      <Box sx={{ display: 'flex', backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarAdmin />
          <Box sx={{ p: '15px' }}>
            <Breadcrumb />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginLeft: '20px' }}>
              Recent Purchases
            </Typography>
          </Box>
          <Grid sx={{ p: '20px' }}>
            <TableContainer component={Paper} sx={{ maxHeight: tableContainerHeight, overflow: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">{/* <Checkbox /> */}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Product
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Order ID
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Date
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Customer Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Seller Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell align="center">
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: 'black',
                            display: 'inline-block',
                          }}
                        />
                      </TableCell>
                      <TableCell>{order.productName}</TableCell>
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
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter sx={{ position: 'sticky', bottom: 0, backgroundColor: '#FFF5F0' }}>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      count={totalRows}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default OrderList;
