// src/Components/Footer/ContactUs.js
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Paper,
  ThemeProvider,
  Hidden,
} from "@mui/material";
import { footerStyles } from "../../Styles/Footer/FooterStyle";
import theme from "../../Styles/Theme";
import contactImage from "../../Assets/Images/contactUs/contact.png";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const formData = { name, email, message };

    try {
      const response = await axios.post("/submit-form", formData);
      if (response.status === 200) {
        setSuccess("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setError("");
      } else {
        setError("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      setError(
        "There was an error submitting the form. Please try again later."
      );
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <Grid container>
        <Hidden mdDown>
          <Grid item md={6}>
            <Grid container sx={{ paddingLeft: "7vh" }}>
              <Grid
                item
                lg={12}
                md={12}
                sx={{
                  display: "flex",
                  marginTop: "10vh",
                  justifyContent: "center",
                }}
              >
                <img src={contactImage} alt="Signup" width="100%" />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          bgcolor="#FF8841"
          height="100vh"
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
            <Box sx={footerStyles.container}>
              <Typography variant="h4" sx={footerStyles.title}>
                Contact Us
              </Typography>

              <Box
                component="form"
                sx={footerStyles.form}
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={footerStyles.button}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            {error && (
              <Alert severity="error" sx={footerStyles.errorMessage}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={footerStyles.successMessage}>
                {success}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ContactUs;
