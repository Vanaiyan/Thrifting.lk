import React, { useState } from "react";
import {
  ThemeProvider,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Hidden,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../Styles/Theme";
import loginImage from "../../Assets/Images/login/seller-login.png";
import NavLogin from "../../Components/Navigation bar/nav-login";
import { loginSeller } from "../../Actions/sellerAction";
import { useSnackbar } from "../../Actions/snackbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginSellerPage = () => {
  const { snackbarOpen, successMessage, handleSnackbarClose, showSnackbar } =
    useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State to manage snackbar severity
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginSeller(email, password));

      if (response.data.success) {
        // console.log("Success:", response.data);

        setSnackbarSeverity("success");
        showSnackbar("Login successful!");

        setTimeout(() => {
          navigate("/seller/dashboard");
        }, 1000);
      } else {
        setSnackbarSeverity("error");
        showSnackbar(response.data.message);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      showSnackbar(error.response.data.message);
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
            bgcolor="#1B202D"
            height="110vh"
            boxShadow="10px 10px 30px rgba(0, 0, 0, 0.5)"
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
                variant="title2"
                bgColor="primary"
                sx={{ fontWeight: 700, color: "#344054" }}
              >
                Login to your Seller account.
              </Typography>
              <Typography variant="subtitle2">
                Don't you have an account?
                <NavLink to="/seller/register" exact activeClassName="active">
                  SignUp
                </NavLink>
              </Typography>
              <br />
              <Typography variant="subtitle2">
                Please fill your detail to access your account.{" "}
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
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
                    marginBottom: "5%",
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
                <Alert
                  onClose={handleSnackbarClose}
                  severity={snackbarSeverity}
                >
                  {successMessage}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>
          <Hidden mdDown>
            <Grid item md={6}>
              <Grid container sx={{ paddingLeft: "7vh" }}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sx={{
                    display: "flex",
                    marginTop: "15vh",
                    justifyContent: "center",
                  }}
                >
                  <img src={loginImage} alt="Signup" />
                </Grid>
                <Grid marginLeft="20px">
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "10px",
                      fontWeight: "800",
                      color: "#FF8841",
                    }}
                  >
                    Welcome Back to Your Seller Dashboard!{" "}
                  </Typography>
                  <Typography variant="body1">
                    Unlock exclusive perks by logging in to your Seller account.
                    Manage your listings and access special features on
                    Thrifting.lk!
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

export default LoginSellerPage;
