import React from "react";
import { Link } from "react-router-dom"; 
import {
  BannerContainer,
  TextContainer,
  Typo1,
  Typo2,
  Typo3,
} from "../../Styles/SellerPage/Banner";
import { Button } from "@mui/material";
import theme from "../../Styles/Theme";
import { useMediaQuery } from "@mui/material";

const Banner = () => {
  return (
    <BannerContainer>
      <TextContainer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typo1>NUMBER ONE ONLINE SELLING PLATFORM</Typo1>
        <br />
        <Typo2 style={{ color: "#FF8841" }}>Smart Choice</Typo2>
        <Typo2 style={{ color: "#FFFFFF" }}>For Your Business Growth</Typo2>
        <br />
        <Typo3>
          Join our thriving seller community! Experience seamless
          transactions,<br /> robust support, and unparalleled exposure. Elevate your
          sales journey with us today.
        </Typo3>
        <br />
        <br />
        <Link to="/seller/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size={useMediaQuery(theme.breakpoints.down("md")) ? "small" : "large"}
            sx={{ borderRadius: "17px" }}
          >
            {"Register As Seller"}
          </Button>
        </Link>
      </TextContainer>
    </BannerContainer>
  );
};

export default Banner;
