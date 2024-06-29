import React, { useState } from "react";
import {
  ThemeProvider,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Divider,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../Styles/Theme";
import NavLogin from "../../Components/Navigation bar/nav-login";
import { useSnackbar } from "../../Actions/snackbar";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../../Actions/adminActions";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const AdminRegister = () => {
  const { snackbarOpen, successMessage, handleSnackbarClose, showSnackbar } =
    useSnackbar();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adminData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await dispatch(registerAdmin(adminData));

      if (response.data.success) {
        console.log("Registration Success:", response.data);
        showSnackbar("Registration successful!");
        navigate("/admin/dashboard");
      } else {
        showSnackbar(response.data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      showSnackbar(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <Box
        sx={{
          minHeight: "105vh",
          bgcolor: "#1B202D",
        }}
      >
        <NavLogin />
        <Box
          sx={{
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1B202D",
          }}
        >
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={3.5}>
              <Paper
                sx={{
                  padding: "2vh 2vw",
                  margin: "0 2vw",
                  boxShadow: "10px 4px 30px rgba(0, 0, 0, 0.4)",
                  borderRadius: "16px",
                  bgcolor: "#fff",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#344054",
                    textAlign: "center",
                  }}
                >
                  Register as Admin
                </Typography>
                <Divider />

                <form onSubmit={handleSubmit}>
                  <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    sx={{
                      fontSize: "14px",
                      marginBottom: "10px",
                      marginTop: "30px",
                    }}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    sx={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ fontSize: "14px", marginBottom: "20px" }}
                  />

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
                    Register
                  </Button>
                </form>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  Already have an account?{" "}
                  <Link component={RouterLink} to="/admin/login">
                    Sign In
                  </Link>
                </Typography>

                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000} // Adjust the duration as needed
                  onClose={handleSnackbarClose}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert onClose={handleSnackbarClose} severity="success">
                    {successMessage}
                  </Alert>
                </Snackbar>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};



export default AdminRegister;
