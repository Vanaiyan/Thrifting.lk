import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import FeedbackDialog from "../../Components/Cart/FeedbackDialog"; // Adjust the path as necessary
import { getOrdersByUserId } from "../../Actions/orderActions"; // Adjust the path as necessary
import NavigationAuth from "../../Components/Navigation bar/navigationAuth";
import Footer from "../../Components/Footer/Footer";

const MyPurchasesPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersByUserId(userId);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleFeedbackDialogOpen = (order) => {
    setSelectedOrder(order);
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackDialogClose = () => {
    setFeedbackDialogOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Box minHeight={"105vh"}>
        <NavigationAuth />
        <Box margin={"0 7vw "}>
          <Typography variant="h4" gutterBottom mt="20px">
            My Purchases
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>Date of Purchase</TableCell>
                    <Tooltip
                      title="The Feedback button will only be available if you have not provided feedback for that product yet."
                      arrow
                    >
                      <TableCell>Feedback</TableCell>
                    </Tooltip>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.productId}>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.sellerName}</TableCell>
                      <TableCell>
                        {new Date(order.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {!order.feedback ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleFeedbackDialogOpen(order)}
                          >
                            Give Feedback
                          </Button>
                        ) : (
                          "You've already given feedback!"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedOrder && (
            <FeedbackDialog
              open={feedbackDialogOpen}
              onClose={handleFeedbackDialogClose}
              seller={selectedOrder.sellerId}
              productId={selectedOrder.productId}
            />
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MyPurchasesPage;
