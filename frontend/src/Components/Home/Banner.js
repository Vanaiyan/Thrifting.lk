import React from "react";
import {
  BannerContainer,
  TextContainer,
  ImageContainer1,
  ImageContainer2,
  LearnmoreButton,
  Typo1,
  Typo2,
  Typo3,
} from "../../Styles/home/banner";
import { Typography, Box, Button } from "@mui/material";
import { SignUpButton } from "../../Styles/NavBar/nav01";
import imgBlur from "./images/bg-blur.png";
import imgCollection from "./images/front-collection.png";
import { Hidden } from "@material-ui/core";
import theme from "../../Styles/Theme";
import { useMediaQuery } from "@mui/material";
const Banner = () => {
  return (
    <BannerContainer>
      <TextContainer>
        <Typo1>Eco Trend Platform</Typo1>
        <br />
        <Typo2>
          Reimagine <br />
          Your Closet,
          <br />
          Reshape the World
        </Typo2>
        <br />
        <Typo3>Buy, Sell, and Embrace Second-Hand Fashion</Typo3>
        <br />
        <Button
          variant="contained"
          size={useMediaQuery(theme.breakpoints.down("md")) ? "small" : "large"}
          sx={{ borderRadius: "17px" }}
        >
          {"Learn More "}
        </Button>
      </TextContainer>
      <ImageContainer1>
        <img src={imgBlur} style={{ height: "80%" }} />
      </ImageContainer1>

      <Hidden smDown>
        <ImageContainer2>
          <Box>
            <img
              src={imgCollection}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </ImageContainer2>
      </Hidden>
    </BannerContainer>
  );
};

export default Banner;
