import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Paper,
  Alert,
  Snackbar,
  Hidden,
  MenuItem,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
import theme from "../../Styles/Theme";
import { NavSeller } from "../Navigation bar/desktop/nav-seller";

const RegisterDesk = () => {
  const [display, setDisplay] = useState(true);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected file
    console.log("Selected file:", file);
  };

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <NavSeller Subtitle="SignUp" />
      <Box
        maxWidth="100%"
        bgcolor={"#242325"}
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
            lg={12}
            md={6}
            xs={12}
            bgcolor="#fff"
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
                variant="title2"
                bgColor="primary"
                sx={{ fontWeight: 400, color: "#344054" }}
              >
                {display ? (
                  <>
                    Hey
                    <br />
                    Ready to share a bit more about yourself with us?
                  </>
                ) : (
                  ""
                )}
              </Typography>
              <form>
                <Grid container spacing={2}>
                  {display && (
                    <>
                      <Grid item lg={6} md={6} xs={12}>
                        <Box bgcolor="#fff" p={2}>
                          <Typography variant="subtitle1">
                            Personal Information
                          </Typography>
                          <TextField
                            label="First Name"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="Last Name"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="PhoneNumber"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <Box
                          bgcolor="#fff"
                          // height="110vh"
                          p={2}
                        >
                          <Typography variant="subtitle1">
                            Address Information 
                          </Typography>
                          <TextField
                            label="Address 1 "
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="Address 2 "
                            fullWidth
                            margin="normal"
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="District"
                            fullWidth
                            margin="normal"
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                            select
                          >
                            <MenuItem value="JAF">Jaffna</MenuItem>
                            <MenuItem value="COL">Colombo</MenuItem>
                            <MenuItem value="TRINCO">Trincomale</MenuItem>
                            <MenuItem value="MANNAR">Mannar</MenuItem>
                          </TextField> 

                          <TextField
                            label="Postal Code"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                        </Box>
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
                          sx={{
                            fontSize: "14px",
                            marginBottom: "5%",
                            borderRadius: "8px",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                            setDisplay(!display);
                          }}
                        >
                          Next
                        </Button>
                      </Grid>
                    </>
                  )}
                  {!display && (
                    <>
                      <Grid item lg={6} md={6} xs={6}>
                        <Box
                          bgcolor="#fff"
                          // height="110vh"
                          p={2}
                        >
                          <Typography variant="subtitle1">
                            Identity Verification
                          </Typography>
                          <InputLabel
                            variant="filled"
                            sx={{
                              fontSize: "16px",
                              marginBottom: "10px",
                              color: "#242325",
                            }}
                          >
                            Front Side
                          </InputLabel>
                          <Input
                            id="image-file"
                            type="file"
                            onChange={handleFileChange}
                            sx={{ padding: "10px" }}
                            inputProps={{
                              accept: "image/*",
                            }}
                          />
                          <IconButton >
                              <EditIcon />
                          </IconButton>
    
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
                          <Input
                            id="image-file"
                            type="file"
                            onChange={handleFileChange}
                            sx={{ padding: "10px" }}
                            inputProps={{
                              accept: "image/*",
                            }}
                          />
                          <TextField
                            label="Name on NIC"
                            fullWidth
                            margin="normal"
                            required
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                          />
                          <TextField
                            label="NIC Number"
                            fullWidth
                            margin="normal"
                            sx={{ fontSize: "14px", marginBottom: "10px" }}
                            inputProps={{
                              maxLength: 12,
                            }}
                          />
                        </Box>
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
                          sx={{
                            fontSize: "14px",
                            marginBottom: "5%",
                            borderRadius: "8px",
                            padding: "10px 20px",
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterDesk;
