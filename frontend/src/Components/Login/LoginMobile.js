import React, { useState } from "react";
import {
  ThemeProvider,
  Container,
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

const LoginMobile = () => {
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
        // console.log("Success:", data);
        showSnackbar("Login successful!");
      } else {
        showSnackbar(data.message);
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <NavLogin />
      <Container maxWidth="xl">
        <Paper
          sx={{
            bgColor: "#fff",
            padding: "2vh 2vw",
            margin: "100px 5vw",
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
              required
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            />
            <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
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
      </Container>
    </ThemeProvider>
  );
};

export default LoginMobile;
