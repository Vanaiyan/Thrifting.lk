// src/components/ReportIssueButton.js

import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { postFeedbackAction } from "../../Actions/feedbackAction";

const issueCategories = [
  { value: "no_response", label: "No Response" },
  { value: "product_not_as_described", label: "Product Not as Described" },
  { value: "delayed_shipping", label: "Delayed Shipping" },
  { value: "defective_product", label: "Defective Product" },
  { value: "payment_issues", label: "Payment Issues" },
  { value: "fraudulent_seller", label: "Fraudulent Seller" },
  { value: "poor_communication", label: "Poor Communication" },
  { value: "other", label: "Other" },
];

const ReportIssueButton = ({ seller, productName, productId }) => {
  const [open, setOpen] = useState(false);
  const [issueCategory, setIssueCategory] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    // Logic to submit the form
    console.log({
      seller,
      productName,
      productId,
      issueCategory,
      issueDescription,
    });
    const feedbackresult = await postFeedbackAction(
      seller,
      productId,
      issueCategory
    );
    console.log(feedbackresult);
    // Close the modal after submission
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleOpen}
        sx={{ mr: "10px" }}
      >
        <Typography sx={{ fontSize: "12px" }}>Report Issue</Typography>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography variant="h6" component="h2">
            Report an Issue
          </Typography>
          <TextField
            fullWidth
            select
            label="Issue Category"
            value={issueCategory}
            onChange={(e) => setIssueCategory(e.target.value)}
            margin="normal"
          >
            {issueCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Issue Description"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            multiline
            rows={4}
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: "70vw", // Change this to adjust the width of the modal
  maxHeight: "90vh",
  overflowY: "auto",
};

export default ReportIssueButton;
