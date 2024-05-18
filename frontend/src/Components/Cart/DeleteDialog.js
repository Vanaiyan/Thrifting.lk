import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialog = ({ open, handleClose, handleConfirm, productName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Item from Cart?</DialogTitle>
      <DialogContent>
        Are you sure you want to remove <strong>{productName}</strong> from your
        cart?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
