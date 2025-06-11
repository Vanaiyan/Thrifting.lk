import styled from "@emotion/styled";
// import { useTheme } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
export const BannerContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${require('../../Assets/Images/sellerPage/bg.png')})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  padding: "0 50px",
  height: "85vh", 
  display: "flex",
  justifyContent: "center",
  borderRadius: "25px",
  [theme.breakpoints.up("md")]: {
    margin: "10px 2vw",
  },
  [theme.breakpoints.up("lg")]: {
    margin: "10px 7vw",
  },
}));
export const TextContainer = styled(Box)({
  padding: 0,
  margin: 0,
  width: "100vw",
  alignItems: "flex-start",
  marginTop: "5%",
  position: "relative",
  zIndex: 2,
});

export const ImageContainer1 = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: 0,
  position: "absolute",
  top: "10%",
  left: "60%",
  right: 0,
  bottom: 0,
  zIndex: 0,
  height: { lg: "80vh", md: "70vh" },
  width: { lg: "80vh", md: "70vh" },
}));

export const ImageContainer2 = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: 0,
  position: "absolute",
  top: "30%",
  left: "35%",
  right: 0,
  bottom: 0,
  zIndex: 1,
  [theme.breakpoints.up("xs")]: {
    height: "55%",
    width: "55%",
    top: "27%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "60%",
    width: "60%",
    top: "30%",
  },
  [theme.breakpoints.up("md")]: {
    height: "65%",
    width: "65%",
    top: "25%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "80%",
    width: "80%",
    top: "30%",
  },
}));

export const Typo1 = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color:"#FFFFFF",
  backgroundColor: 'rgba(36,41,53,0.8)',
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding:"10px",
  borderRadius: "20px",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.4rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem",
  },
}));

export const Typo2 = styled(Typography)(({ theme }) => ({
    fontFamily: "'Inter', sans-serif",
  fontStyle: "normal",
  fontWeight: 800,
  textAlign:"center",
  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  lineHeight: "1.2",
  [theme.breakpoints.up("xs")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.4rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "4rem",
  },
}));

export const Typo3 = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontStyle: "normal",
  color:'#FFFFFF',
  textAlign:'center',
  fontWeight: 600,
  fontSize: "0.1rem",
  letterSpacing: "-0.01em",

  [theme.breakpoints.up("xs")]: {
    fontSize: "0.4rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem",
  },
}));

export const LearnmoreButton = styled(Button)({
  justifyContent: "center",
  alignItems: "center",
  background: "#FF5003",
  borderRadius: "17px",
  border: "none",
  color: "#fff",
  maxHeight: "50px",
  minWidth: "80px",
  fontWeight: 700,
  padding: "20px",
  fontSize: { lg: "14px", md: "12px" },
});
