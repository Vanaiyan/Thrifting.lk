import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Hidden } from "@mui/material";
import theme from "../../Styles/Theme";
import signupImage from "./images/img-signup.png";
import NavLogin from "../Navigation bar/nav-login";
import { useState } from "react";
import axios from "axios";

const SignUpMobile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/register`,
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

      // console.log("Success:", data);
      // Handle success, e.g., redirect to another page
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle error, e.g., display an error message to the user
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
            boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.25)",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="title1"
            bgColor="primary"
            sx={{ fontWeight: 700, color: "#344054" }}
          >
            Create Account
          </Typography>
          <Typography variant="subtitle1">
            Already have an account?
            {/* <Link to="/signin">Sign in</Link> */}
          </Typography>
          <Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              {/* ... Your other form elements */}
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
          </Grid>
        </Paper>

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
      </Container>
    </ThemeProvider>
  );
};

export default SignUpMobile;
