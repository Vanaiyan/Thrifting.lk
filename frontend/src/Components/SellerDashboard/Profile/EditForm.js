import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const [sellerDetails, setSellerDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    addressField: {
      address: "",
      city: "",
      district: "",
      postalCode: "",
    },
    nicName: "",
    nicNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/seller/dashboard");
  };
  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/662ba747e59446416eacee2d`);
        // const response = await axios.get(`http://localhost:8000/api/profile/${seller._id}`);
        setSellerDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seller details:", error);
        setLoading(false);
      }
    };
    fetchSellerDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in sellerDetails.addressField) {
      setSellerDetails((prevDetails) => ({
        ...prevDetails,
        addressField: {
          ...prevDetails.addressField,
          [name]: value,
        },
      }));
    } else {
      setSellerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (sellerDetails.password !== sellerDetails.confirmPassword) {
      setErrors({
        confirmPassword: "Password and confirm password do not match",
      });
      return;
    }

    // Remove confirmPassword field from the data sent to the backend
    const { confirmPassword, ...dataToSend } = sellerDetails;

    try {
      const response = await axios.put(
        "http://localhost:8000/api/profile/662ba6ddffd7af4f4a7fd633",
        dataToSend
      );
      console.log("Seller details updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating seller details:", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          xs={12}
          
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: "25px 25px",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <Grid xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid sx={{ display: "flex" }} gap={2}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                required
                name="firstName"
                value={sellerDetails.firstName}
                onChange={handleChange}
                error={errors.firstName !== undefined}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                required
                name="lastName"
                value={sellerDetails.lastName}
                onChange={handleChange}
                error={errors.lastName !== undefined}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid sx={{ display: "flex" }} gap={2}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
                name="password"
                value={sellerDetails.password}
                onChange={handleChange}
                error={errors.password !== undefined}
                helperText={errors.password}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                required
                name="confirmPassword"
                value={sellerDetails.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword !== undefined}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid sx={{ display: "flex" }} gap={2}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                name="email"
                value={sellerDetails.email}
                onChange={handleChange}
                error={errors.email !== undefined}
                helperText={errors.email}
                disabled
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                required
                name="phoneNumber"
                value={sellerDetails.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (/^\d{0,10}$/.test(value)) {
                    setSellerDetails((prevDetails) => ({
                      ...prevDetails,
                      phoneNumber: value,
                    }));
                  }
                }}
                error={errors.phoneNumber !== undefined}
                helperText={errors.phoneNumber}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 10,
                  placeholder: "Enter phone number (e.g., 0761234567)",
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Grid sx={{ display: "flex" }} gap={2}>
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                required
                name="address"
                value={sellerDetails.addressField.address}
                onChange={handleChange}
                error={errors.address !== undefined}
                helperText={errors.address}
              />
              <TextField
                label="City"
                fullWidth
                required
                margin="normal"
                name="city"
                value={sellerDetails.addressField.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid sx={{ display: "flex" }} gap={2}>
              <TextField
                label="District"
                fullWidth
                margin="normal"
                name="district"
                value={sellerDetails.addressField.district}
                onChange={handleChange}
                select
              >
                <MenuItem value="AMPARA">Ampara</MenuItem>
                <MenuItem value="ANURADHAPURA">Anuradhapura</MenuItem>
                <MenuItem value="COLOMBO">Colombo</MenuItem>
                <MenuItem value="GALLE">Galle</MenuItem>
                <MenuItem value="GAMPAHA">Gampaha</MenuItem>
                <MenuItem value="HAMBANTOTA">Hambantota</MenuItem>
                <MenuItem value="JAFFNA">Jaffna</MenuItem>
                <MenuItem value="KALUTARA">Kalutara</MenuItem>
                <MenuItem value="KANDY">Kandy</MenuItem>
                <MenuItem value="KEGALLE">Kegalle</MenuItem>
                <MenuItem value="KILINOCHCHI">Kilinochchi</MenuItem>
                <MenuItem value="MANNAR">Mannar</MenuItem>
                <MenuItem value="TRINCOMALEE">Trincomalee</MenuItem>
              </TextField>
              <TextField
                label="Postal Code"
                fullWidth
                margin="normal"
                name="postalCode"
                value={sellerDetails.addressField.postalCode}
                onChange={handleChange}
                error={errors.postalCode !== undefined}
                helperText={errors.postalCode}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Box mt={2} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default EditForm;
