import React, { useState } from "react";
import { Grid, TextField, Button, Snackbar } from "@mui/material";
import axios from "axios";

const ChangePasswordForm = ({ seller }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const clearForm = ()=>{
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("New password and confirm password do not match.");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Validate current password
      const validateResponse = await axios.put(`http://localhost:8000/api/profile/validatePassword/${seller._id}`, {
        currentPassword
      });

      console.log("Validate:", validateResponse.data);
      if (!validateResponse.data.valid) {
        setSnackbarMessage("Current password is incorrect.");
        setSnackbarOpen(true);
        return;
      }

      // Update the password
      const response = await axios.put(`http://localhost:8000/api/profile/editPassword/${seller._id}`, {
        newPassword
      });

      console.log("Password changed successfully:", response);
      setSnackbarMessage("Password changed successfully");
      setSnackbarOpen(true);
      clearForm();
    } catch (error) {
      console.error("Error changing password:", error);
      setSnackbarMessage("Error changing password");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const isFormFilled = currentPassword && newPassword && confirmNewPassword;
  return (
    <div>
      <Grid container spacing={1} direction="column" alignItems="center"  >
        <Grid item xs={12} md={6} sx={{width:"40%"}}>
          <TextField
            label="Current Password"
            type="password"
            required
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{width:"40%"}}>
          <TextField
            label="New Password"
            type="password"
            required
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{width:"40%"}}>
          <TextField
            label="Confirm New Password"
            type="password"
            required
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleChangePassword}
            disabled={!isFormFilled}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ChangePasswordForm;
