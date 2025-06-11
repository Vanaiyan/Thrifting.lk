import React, { useState } from "react";
import {
  ThemeProvider,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Hidden,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../Styles/Theme";
import loginImage from "./images/img-login.png";
import NavLogin from "../Navigation bar/nav-login";
import { loginUser } from "../../Actions/userAction";
import { useSnackbar } from "../../Actions/snackbar";

const LoginDesk = () => {
  const { snackbarOpen, successMessage, handleSnackbarClose, showSnackbar } =
    useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);

      if (data.success) {
        console.log("Success:", data);
        showSnackbar("Login successful!");
      } else {
        showSnackbar(data.message);
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.");
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
                variant="title1"
                bgColor="primary"
                sx={{ fontWeight: 700, color: "#344054" }}
              >
                Login
              </Typography>
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  sx={{ fontSize: "14px", marginBottom: "10px" }}
                />
                <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChange} />
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
                  signin
                </Button>
              </form>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} // Adjust the duration as needed
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
                    variant="h4"
                    sx={{
                      marginTop: "10px",
                      fontWeight: "800",
                      color: "#FF8841",
                    }}
                  >
                    WELCOME Back
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

export default LoginDesk;
