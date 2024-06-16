import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Alert, Snackbar, Hidden, Checkbox, FormControlLabel } from "@mui/material";
import theme from "../../Styles/Theme";
import signupImage from "./images/img-signup.png";
import NavLogin from "../Navigation bar/nav-login";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpDesk = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const handleChangeterm = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case "firstName":
        errors.firstName = value.trim() ? "" : "First Name is required";
        break;
      case "lastName":
        errors.lastName = value.trim() ? "" : "Last Name is required";
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email is invalid";
        } else {
          errors.email = "";
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 8) {
          errors.password = "Password must be at least 8 characters long";
        } else if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
          errors.password = "Password must contain at least one letter and one number";
        } else {
          errors.password = "";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Confirm Password is required";
        } else if (value !== password) {
          errors.confirmPassword = "Passwords do not match";
        } else {
          errors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the user has agreed to the terms
    if (!checked) {
      setErrorMessage("Please agree to the Privacy Policy and Terms of Use");
      return;
    }
    if (Object.values(validationErrors).some((error) => error)) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.success) {
        console.log("Success:", data);
        setSuccessMessage("Account Created Successfully!");
        setSnackbarOpen(true);

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2 seconds delay to show the Snackbar message
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      setErrorMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <NavLogin />
      <Box
        maxWidth="100%"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            bgcolor="#FF8841"
            height="110vh"
            boxShadow="10px 10px 30px rgba(0, 0, 0, 0.4)"
          >
            <Paper
              sx={{
                bgColor: "#fff",
                padding: "2vh 2vw",
                margin: "100px 7vw",
                boxShadow: "10px 4px 30px rgba(0, 0, 0, 0.4)",
                borderRadius: "16px",
              }}
            >
              <Typography
                variant="h5"
                bgColor="primary"
                sx={{ fontWeight: 700, color: "#344054" }}
              >
                Create Account
              </Typography>
              <Typography variant="subtitle2">
                Already have an account?
                <NavLink to="/login" exact activeClassName="active">
                  Log In
                </NavLink>
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  required
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                  error={!!validationErrors.firstName}
                  helperText={validationErrors.firstName}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  required
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                  error={!!validationErrors.lastName}
                  helperText={validationErrors.lastName}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  name="password"
                  value={password}
                  onChange={handleChange}
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  sx={{ fontSize: "14px", marginBottom: "25px" }}
                  error={!!validationErrors.confirmPassword}
                  helperText={validationErrors.confirmPassword}
                />
                <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChangeterm} />
                    }
                  />
                  I agree with Privacy Policy and Terms of Use
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: "14px",
                    marginBottom: "5%",
                    borderRadius: "8px",
                    padding: "10px 20px",
                  }}
                >
                  Create Account
                </Button>
              </form>
              {errorMessage && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "center", horizontal: "left" }}
              >
                <Alert onClose={handleSnackbarClose} severity="success">
                  {successMessage}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>

          <Hidden mdDown>
            <Grid item md={6}>
              <Grid container>
                <Grid
                  item
                  lg={12}
                  sx={{
                    display: "flex",
                    marginTop: "15vh",
                    justifyContent: "center",
                  }}
                >
                  <img src={signupImage} alt="Signup" />
                </Grid>
                <Grid marginLeft="20px">
                  <Typography
                    variant="h4"
                    sx={{
                      marginTop: "10px",
                      fontWeight: "800",
                      color: "#FF8841",
                    }}
                  >
                    WELCOME to Thrifting.lk
                  </Typography>
                  <Typography variant="body1">
                    Unleash the magic by logging into your account. Exclusive
                    deals, personalized delights, and a treasure trove of
                    Thrifting.lk await you
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpDesk;
