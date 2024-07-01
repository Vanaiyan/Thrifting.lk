import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  MenuItem,
  Snackbar,
  Input,
  InputLabel,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import districts from "../Data/Districts";
import axios from "axios";
import { uploadNicImages } from "../../Actions/sellerAction";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [nicName, setNicName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [backErrors, setBackErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    setNicName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone Number is invalid";
    }

    // Address Information Validation
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!district.trim()) {
      newErrors.district = "District is required";
    }

    if (!postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    }

    // Identity Verification Validation
    if (!nicName.trim()) {
      newErrors.nicName = "Name on NIC is required";
    }

    if (!nicNumber.trim()) {
      newErrors.nicNumber = "NIC Number is required";
    } else if (
      !(nicNumber.trim().length === 12 && /^\d+$/.test(nicNumber.trim())) &&
      !(nicNumber.trim().length === 10 && /^\d{9}[Vv]$/.test(nicNumber.trim()))
    ) {
      newErrors.nicNumber =
        "NIC Number must be either 12 digits or 9 digits followed by 'V'";
    }

    if (!frontImage || !frontImage.type.startsWith("image/")) {
      newErrors.frontImage = "Please select a valid front image file";
    }

    if (!backImage || !backImage.type.startsWith("image/")) {
      newErrors.backImage = "Please select a valid back image file";
    }

    setErrors(newErrors);
    setOpenAlert(Object.keys(newErrors).length > 0);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        const frontImageUrl = await uploadNicImages(frontImage);
        const backImageUrl = await uploadNicImages(backImage);

        const response = await axios.post(
          "http://localhost:8000/seller",
          {
            firstName,
            lastName,
            password,
            email,
            phoneNumber,
            addressField: {
              address,
              city,
              district,
              postalCode,
            },
            nicName,
            nicNumber,
            frontImage: frontImageUrl,
            backImage: backImageUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Form submitted successfully!");
          setTimeout(() => {
            navigate("/seller/login");
          }, 3000);
        } else {
          console.log("Form validation failed. Please check the errors.");
        }
      } catch (error) {
        setBackErrors(error.response.data);
        console.error("Error:", error.response.data);
      } finally {
        setSubmitting(false);
      }
    } else {
      console.log(
        "Form validation failed in register form. Please check the errors."
      );
    }
  };

  const handleDrop = (event, side) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (side === "front") {
        setFrontImage(file);
      } else if (side === "back") {
        setBackImage(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event, side) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (side === "front") {
        setFrontImage(file);
      } else if (side === "back") {
        setBackImage(file);
      }
    }
  };
  return (
    <form>
      <div className="RegisterForm">
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {Object.keys(errors).length > 0 ? (
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            ) : (
              "There are errors in the form. Please check again."
            )}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!backErrors && Object.keys(backErrors).length > 0}
          autoHideDuration={6000}
          onClose={() => setBackErrors("")}
        >
          <Alert
            onClose={() => setBackErrors("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {backErrors.message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => {
            setSuccessMessage("");
          }}
        >
          <Alert
            onClose={() => setSuccessMessage("")}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>

        <Grid container my={5}>
          <Grid item lg={6} md={6} xs={12}>
            <Box bgcolor="#fff" p={2}>
              <Typography variant="subtitle1">Personal Information</Typography>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName !== undefined}
                helperText={errors.firstName}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword !== undefined}
                helperText={errors.confirmPassword}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email !== undefined}
                helperText={errors.email}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="PhoneNumber"
                fullWidth
                margin="normal"
                required
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (/^\d{0,10}$/.test(value)) {
                    setPhoneNumber(value);
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
          <Grid item lg={6} md={6} xs={12}>
            <Box
              bgcolor="#fff"
              // height="110vh"
              p={2}
            >
              <Typography variant="subtitle1">Address Information</Typography>
              <TextField
                label="Address "
                fullWidth
                margin="normal"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={errors.address !== undefined}
                helperText={errors.address}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="City"
                fullWidth
                required
                margin="normal"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="District"
                fullWidth
                margin="normal"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
                select
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Postal Code"
                fullWidth
                margin="normal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                error={errors.postalCode !== undefined}
                helperText={errors.postalCode}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
            </Box>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Box p={2}>
              <Typography variant="subtitle1">Identity Verification</Typography>
              <Grid item lg={6} md={12} xs={12}>
                <TextField
                  label="Name on NIC"
                  fullWidth
                  margin="normal"
                  required
                  value={nicName}
                  onChange={(e) => setNicName(e.target.value)}
                  error={errors.nicName !== undefined}
                  helperText={errors.nicName}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                />
                <TextField
                  label="NIC Number"
                  fullWidth
                  margin="normal"
                  required
                  value={nicNumber}
                  onChange={(e) => setNicNumber(e.target.value)}
                  error={errors.nicNumber !== undefined}
                  helperText={errors.nicNumber}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                  inputProps={{
                    maxLength: 12,
                  }}
                />
              </Grid>
              <div
                onDrop={(event) => handleDrop(event, "front")}
                onDragOver={handleDragOver}
                style={{
                  border: "#ccc",
                  padding: "10px",
                  marginBottom: "5px",
                }}
              >
                <InputLabel
                  variant="filled"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "#242325",
                  }}
                >
                  Front Side
                </InputLabel>

                {frontImage ? (
                  <div
                    style={{
                      padding: "15px 50px",
                      marginBottom: "5px",
                      maxHeight: "280px",
                      maxWidth: "40%",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(frontImage)}
                      alt="Front Side"
                      height="250px"
                    />
                  </div>
                ) : (
                  <Input
                    id="front-image-file"
                    type="file"
                    onChange={(event) => handleFileChange(event, "front")}
                    sx={{ padding: "10px" }}
                    inputProps={{
                      accept: "image/*",
                    }}
                  />
                )}
                {errors.frontImage && (
                  <Typography variant="caption" color="error">
                    {errors.frontImage}
                  </Typography>
                )}
              </div>
              <div
                onDrop={(event) => handleDrop(event, "back")}
                onDragOver={handleDragOver}
                style={{
                  border: "#ccc",
                  padding: "10px",
                  marginBottom: "5px",
                }}
              >
                <InputLabel
                  variant="filled"
                  sx={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    color: "#242325",
                  }}
                >
                  Back Side
                </InputLabel>
                {backImage ? (
                  <div
                    style={{
                      padding: "15px 50px",
                      marginBottom: "5px",
                      maxHeight: "280px",
                      maxWidth: "40%",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(backImage)}
                      alt="Back Side"
                      height="250px"
                    />
                  </div>
                ) : (
                  <Input
                    id="back-image-file"
                    type="file"
                    onChange={(event) => handleFileChange(event, "back")}
                    sx={{ padding: "10px" }}
                    inputProps={{
                      accept: "image/*",
                    }}
                  />
                )}
                {errors.backImage && (
                  <Typography variant="caption" color="error">
                    {errors.backImage}
                  </Typography>
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
          sx={{ textAlign: "right" }}
          mx={10}
          my={1}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{
              fontSize: "14px",
              marginBottom: "5%",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Grid>
      </div>
    </form>
  );
};

export default RegisterForm;
