import React from "react";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import districts from '../../Data/Districts'

const EditDetailsForm = ({ editMode, handleChange, editableSeller }) => {
  // const districts = ["Jaffna", "Kandy", "District 3"];

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} spacing={2} gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Personal Information
          </Typography>
          <Grid xs={12} sx={{ display: "flex", padding: "10px" }} gap={1}>
            <Grid xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={editableSeller.firstName}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={editableSeller.lastName}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ display: "flex", padding: "10px" }} gap={1}>
            <Grid xs={6}>
              <TextField
                label="Email"
                name="email"
                value={editableSeller.email}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={editableSeller.phoneNumber}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Address Information
          </Typography>
          <Grid xs={12} sx={{ display: "flex", padding: "10px" }} gap={2}>
            <Grid xs={6}>
              <TextField
                label="Address"
                name="address"
                value={editableSeller.addressField.address}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
                style={{ marginBottom: "5px" }}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label="City"
                name="city"
                value={editableSeller.addressField.city}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
                style={{ marginBottom: "5px" }}
              />
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ display: "flex", padding: "10px" }} gap={2}>
            <Grid xs={6}>
              <FormControl
                fullWidth
                style={{ marginBottom: "5px" }}
                disabled={!editMode}
              >
                <InputLabel>District</InputLabel>
                <Select
                  label="District"
                  name="district"
                  value={editableSeller.addressField.district}
                  onChange={handleChange}
                >
                  {districts.map((districts) => (
                    <MenuItem key={districts} value={districts}>
                      {districts}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={editableSeller.addressField.postalCode}
                onChange={handleChange}
                size="medium"
                fullWidth
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditDetailsForm;
