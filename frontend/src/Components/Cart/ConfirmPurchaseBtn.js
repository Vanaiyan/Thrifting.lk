import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Rating,
  Stack,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { postFeedbackAction } from "../../Actions/feedbackAction";
import { soldConfirmBySellerAction } from "../../Actions/cartActions";

const ConfirmPurchaseButton = ({ seller, productId, productName }) => {
  const [openFirstDialog, setOpenFirstDialog] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const handleFirstDialogOpen = () => {
    setOpenFirstDialog(true);
  };

  const handleFirstDialogClose = () => {
    setOpenFirstDialog(false);
    setIsChecked(false);
  };

  const handleFirstDialogConfirm = async () => {
    setOpenFirstDialog(false);
    setOpenSecondDialog(true);
  };

  const handleSecondDialogClose = () => {
    setOpenSecondDialog(false);
  };

  const handleSubmitFeedback = async () => {
    const result = await dispatch(soldConfirmBySellerAction(productId));

    // Handle the feedback submission logic here

    const issueCategory = "null";
    const feedbackresult = await postFeedbackAction(
      seller,
      productId,
      issueCategory,
      rating,
      review
    );
    setOpenSecondDialog(false);
  };

  return (
    <Box>
      <Tooltip
        title="Click this button to confirm you received the product from the seller and completed your purchase."
        arrow
      >
        <Button
          variant="contained"
          color="info"
          onClick={handleFirstDialogOpen}
          size="small"
        >
          I got this product
        </Button>
      </Tooltip>

      {/* First Dialog */}
      <Dialog open={openFirstDialog} onClose={handleFirstDialogClose}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography margin={"10px 0"}>
            Are you sure you received <strong>{productName}</strong>?
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            }
            label={`I confirm I received ${productName} from seller and now confirm my purchase.`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFirstDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleFirstDialogConfirm}
            color="primary"
            disabled={!isChecked}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second Dialog */}
      <Dialog open={openSecondDialog} onClose={handleSecondDialogClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography margin={"10px 0"}>
              Thank you for your purchase! Please leave a rating and review
              below:
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
          <Button onClick={handleSecondDialogClose} color="primary">
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
    </Box>
  );
};

export default ConfirmPurchaseButton;
