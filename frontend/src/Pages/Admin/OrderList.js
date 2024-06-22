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
  IconButton,
  Button,
} from '@mui/material';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import { getOrderList } from '../../Actions/adminActions';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 20; // Number of items per page
  const tableContainerHeight = 400; // Fixed height for the table container

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

  // Function to generate a random background color
  const getRandomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Function to get avatar content based on availability
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage); // Calculate total pages
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxPageDisplay = 5; // Maximum number of pages to display in pagination

    if (totalPages <= maxPageDisplay) {
      // If total pages are less than or equal to maxPageDisplay, show all page numbers
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IconButton
            color="primary"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </IconButton>
          {pageNumbers.map((num) => (
            <Button
              key={num}
              variant={num === page ? 'contained' : 'text'}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </Button>
          ))}
          <IconButton
            color="primary"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </IconButton>
        </Box>
      );
    } else {
      // If there are more than maxPageDisplay pages, show a limited set of pages
      const currentPageGroup = Math.ceil(page / maxPageDisplay);
      const startPage = (currentPageGroup - 1) * maxPageDisplay + 1;
      const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);

      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IconButton
            color="primary"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </IconButton>
          {pageNumbers.slice(startPage - 1, endPage).map((num) => (
            <Button
              key={num}
              variant={num === page ? 'contained' : 'text'}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </Button>
          ))}
          <IconButton
            color="primary"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{ p: "15px" }}>
          <Breadcrumb />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginLeft: '20px' }}>Recent Purchases</Typography>
        </Box>
        <Grid sx={{ p: "20px" }}>
          <TableContainer component={Paper} sx={{ maxHeight: tableContainerHeight }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox /> */}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Seller Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(startIndex, endIndex).map((order) => (
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
            </Table>
          </TableContainer>
          {renderPagination()}
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderList;
