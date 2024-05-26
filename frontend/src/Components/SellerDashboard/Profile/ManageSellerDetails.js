import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  MenuItem,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageSellerDetails = () => {
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
   navigate('/seller/dashboard');
  };
  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile");
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
      setErrors({ confirmPassword: "Password and confirm password do not match" });
      return;
    }
  
    // Remove confirmPassword field from the data sent to the backend
    const { confirmPassword, ...dataToSend } = sellerDetails;
  
    try {
      const response = await axios.put(
        "http://localhost:8000/api/profile",
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
    <form onSubmit={handleSubmit}>
      <Grid container my={5} xs={6} sx={{backgroundColor:"whitesmoke", display:"content", padding:"40px 40px" , borderRadius:"20px"}}>
        <Grid item lg={6} md={6} xs={12} >
          <Box bgcolor="#fff" p={2} sx={{backgroundColor:"white",borderRadius:"20px",margin:"0px 10px"}}>
            <Typography variant="subtitle1">Personal Information</Typography>
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
                placeholder: "Enter phone number (e.g., 0761234567)",
              }}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} xs={12} >
          <Box bgcolor="#fff" p={2}  sx={{backgroundColor:"white",borderRadius:"20px",margin:"0px 10px"}}>
            <Typography variant="subtitle1">Address Information</Typography>
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
            <TextField
              label="City"
              fullWidth
              required
              margin="normal"
              name="city"
              value={sellerDetails.addressField.city}
              onChange={handleChange}
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
            <TextField
              label="District"
              fullWidth
              margin="normal"
              name="district"
              value={sellerDetails.addressField.district}
              onChange={handleChange}
              sx={{ fontSize: "14px", marginBottom: "10px" }}
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
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
          </Box>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Box p={2} sx={{display:"flex"}} gap={3}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>

            <Button type="button" variant="contained" color="primary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ManageSellerDetails;
