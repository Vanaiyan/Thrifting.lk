import React, { useState } from "react";
import {Avatar, Grid, Button, Rating, Snackbar, Alert } from "@mui/material";
import Form1 from "./Form1";
import axios from "axios";

const EditProf = ({ seller }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableSeller, setEditableSeller] = useState({ ...seller });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableSeller({ ...seller });
  };

   const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/${editableSeller._id}`,
        editableSeller
      );
      console.log("Seller details updated successfully:", response.data);
      setEditMode(false);
      setSnackbarMessage("Seller details updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating seller details:", error);
      setSnackbarMessage("Error updating seller details");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSeller({ ...editableSeller, [name]: value });
  };

  const firstLetter_firstName = seller.firstName ? seller.firstName.charAt(0) : "";
  const firstLetter_lastName = seller.lastName ? seller.lastName.charAt(0) : "";

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ margin: "auto" }}>
      <Grid item xs={12} sm={8} md={10}>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Avatar sx={{ width: 100, height: 100 }}>
              {`${firstLetter_firstName}${firstLetter_lastName}`}
            </Avatar>
            <Rating value={seller.rating} max={10} readOnly />
          </Grid>
          <Form1
            editMode={editMode}
            handleChange={handleChange}
            editableSeller={editableSeller}
          />
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              {editMode ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                    style={{ marginTop: "10px" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditMode(!editMode)}
                  style={{ marginTop: "10px" }}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default EditProf;
