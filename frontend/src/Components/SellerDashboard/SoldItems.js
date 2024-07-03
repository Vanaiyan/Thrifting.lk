import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import axios from "axios";

const SoldItems = ({ sellerId }) => {
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const fetchSoldItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/myproducts/${sellerId}`,
          { withCredentials: true }
        );
        const soldProducts = response.data.filter(
          (product) => product.status === true
        );
        setSoldItems(soldProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sold items:", error);
        setLoading(false);
      }
    };

    fetchSoldItems();
  }, [sellerId]);

  const handleOpen = async (productId) => {
    setOpen(true);
    setFeedbackLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/feedback/${productId}`,
        { withCredentials: true }
      );
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
    setFeedbackLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setFeedbacks([]);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container spacing={2}>
        {soldItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">
                  Price: LKR {product.price - product.discount}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen(product._id)}
                >
                  View Feedback
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Feedbacks</DialogTitle>
        <DialogContent>
          {feedbackLoading ? (
            <CircularProgress />
          ) : feedbacks.length === 0 ? (
            <Typography>No feedbacks available for this product.</Typography>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id}>
                <Typography variant="body1">
                  Review: {feedback.review}
                </Typography>
                <Typography variant="body1">Rating: </Typography>
                <Rating value={feedback.rating} max={10} readOnly />
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SoldItems;
