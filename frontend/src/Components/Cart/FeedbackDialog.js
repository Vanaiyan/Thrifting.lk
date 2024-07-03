//This component is used in My Purchases Page to Get Feed back from USer in that Page
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { postFeedbackAction } from "../../Actions/feedbackAction";

const FeedbackDialog = ({ open, onClose, seller, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const handleSubmitFeedback = async () => {
    // Handle the feedback submission logic here
    console.log("Rating:", rating);
    console.log("Review:", review);
    const issueCategory = "null";
    await postFeedbackAction(productId, seller, issueCategory, rating, review);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography margin={"10px 0"}>
            Thank you for your purchase! Please leave a rating and review below:
          </Typography>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            max={10}
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmitFeedback}
          color="primary"
          disabled={rating === 0}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
