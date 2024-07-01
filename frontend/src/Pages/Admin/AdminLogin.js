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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/system";
import theme from "../../Styles/Theme";
import NavLogin from "../../Components/Navigation bar/nav-login";
import { loginAdmin } from "../../Actions/adminActions";
import { useSnackbar } from "../../Actions/snackbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLoginPage = () => {
  const { snackbarOpen, successMessage, handleSnackbarClose, showSnackbar } =
    useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginAdmin(email, password));

      if (response.data.success) {
        console.log("Success:", response.data);
        showSnackbar("Login successful!");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        showSnackbar(response.data.message);
      }
    } catch (error) {
      console.error(error);
      showSnackbar("An error occurred. Please try again.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  Login as Admin
                </Typography>
                <Divider />

                <form onSubmit={handleSubmit}>
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
                      marginTop: "30px",
                    }}
                  />
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ fontSize: "14px", marginBottom: "20px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      fontSize: "14px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      padding: "10px 20px",
                    }}
                  >
                    Sign In
                  </Button>
                </form>

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
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLoginPage;
