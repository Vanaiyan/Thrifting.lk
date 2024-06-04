import React, { useState } from "react";
import { Avatar, Grid, Typography, TextField, Button, Rating } from "@mui/material";
import EditForm from "./EditForm";

const EditProf = ({ seller }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableSeller, setEditableSeller] = useState({ ...seller });

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      console.log("Save changes", editableSeller); // Save logic can be added here
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableSeller({ ...seller }); // Reset editable seller to original values
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Save changes", editableSeller); // Save logic can be added here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSeller({ ...editableSeller, [name]: value });
  };

  const firstLetter_firstName = seller.firstName
    ? seller.firstName.charAt(0)
    : "";
  const firstLetter_lastName = seller.lastName ? seller.lastName.charAt(0) : "";
  return (
    <Grid container justifyContent="center" style={{ margin: "auto" }}>
    <Grid
      item
      xs={12}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid item xs={6}>
        <Avatar
          sx={{ width: 100, height: 100 }}
        >{`${firstLetter_firstName}${firstLetter_lastName}`}</Avatar>
          <Rating value={seller.netRating+3} readOnly />
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>NIC Name:</strong> {seller.nicName}
          </Typography>
          <Typography variant="body1">
            <strong>NIC Number:</strong> {seller.nicNumber}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={6}>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={editableSeller.firstName}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={editableSeller.lastName}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={editableSeller.email}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={editableSeller.phoneNumber}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={editableSeller.addressField.address}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
              style={{ marginBottom: "5px" }}
            />
            <TextField
              label="City"
              name="city"
              value={editableSeller.addressField.city}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
              style={{ marginBottom: "5px" }}
            />
            <TextField
              label="District"
              name="district"
              value={editableSeller.addressField.district}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
              style={{ marginBottom: "5px" }}
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={editableSeller.addressField.postalCode}
              onChange={handleChange}
              size="small"
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
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
                onClick={handleEditToggle}
                style={{ marginTop: "10px" }}
              >
                Edit
              </Button>
            )}
          </Grid>
        </Grid>

        <EditForm />
      </div>
    </Grid>
  </Grid>
);
};

export default EditProf;
