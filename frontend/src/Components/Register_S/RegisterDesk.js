import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  Paper,
  // Alert,
  // Snackbar,
  // Hidden,
  // Input,
  // InputLabel,
  // IconButton,
} from "@mui/material";
import theme from "../../Styles/Theme";
import { NavSeller } from "../Navigation bar/desktop/nav-seller";
import RegisterForm from "./RegisterForm";
// import Temp from "../../Pages/Seller/Temp";

const RegisterDesk = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <NavSeller Subtitle="Sign Up" />
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
            lg={12}
            md={6}
            xs={12}
            bgcolor="#fff"
            // height="110vh"
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
                <>
                  Hey
                  <br />
                  Ready to share a bit more about yourself with us?
                </>
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <RegisterForm 
                  setBackImage={setBackImage}
                  setFrontImage={setFrontImage}
                  frontImage={frontImage}
                  backImage={backImage}/>
                  {/* <Temp 
                  setBackImage={setBackImage}
                  setFrontImage={setFrontImage}
                  frontImage={frontImage}
                  backImage={backImage}/> */}
                  
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
