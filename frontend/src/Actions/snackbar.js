import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSuccessMessage(message);
    setSnackbarOpen(true);
  };

  return {
    snackbarOpen,
    successMessage,
    handleSnackbarClose,
    showSnackbar,
  };
};
