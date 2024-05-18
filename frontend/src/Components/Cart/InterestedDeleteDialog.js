import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const InterestedDialog = ({
  open,
  handleClose,
  handleConfirm,
  productName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete from Cart?</DialogTitle>
      <DialogContent>
        You've shown interest in <strong>{productName}</strong>. Still want to
        remove it from your cart? <br />
        <br />
        By removing this product, we will automatically inform the seller, and
        it may be displayed on the website to other users in the future. So, you
        will lose this product.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterestedDialog;
