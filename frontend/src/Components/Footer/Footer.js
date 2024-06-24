import React from "react";
import { Grid } from "@mui/material";
import { footerStyles, NavTitle, Typo1 } from "../../Styles/Footer/FooterStyle"; // Import styles from external JS file
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Grid container spacing={2} style={footerStyles.footerContainer}>
      <Grid item xs={12} md={6} style={footerStyles.column}>
        <NavTitle sx={{ color: "#ff5003", mr: 1 }}>Thrifting.lk</NavTitle>
        <Typo1>Discover Thrifted Treasures Today</Typo1>
        <div style={footerStyles.socialLinks}>
          <a href="fblink" style={footerStyles.column.a}>
            <FacebookIcon />
          </a>
          <a href="linkedinlink" style={footerStyles.column.a}>
            <LinkedInIcon />
          </a>
          <a href="twitterlink" style={footerStyles.column.a}>
            <TwitterIcon />
          </a>
          <a href="instagram" style={footerStyles.column.a}>
            <InstagramIcon />
          </a>
        </div>
      </Grid>

      <Grid item xs={4} md={2} style={footerStyles.column}>
        <h3 style={footerStyles.column.h3}>Information</h3>
        <ul style={footerStyles.column.ul}>
          <li style={footerStyles.column.li}>
            <a href="/contactUs" style={footerStyles.column.a}>
              {" "}
              ContactUs
            </a>
          </li>
          <li style={footerStyles.column.li}>
            <a href="/terms" style={footerStyles.column.a}>
              {" "}
              Terms & Conditions
            </a>
          </li>
        </ul>
      </Grid>
      <Grid item xs={4} md={2} style={footerStyles.column}>
        <h3 style={footerStyles.column.h3}>About</h3>
        <ul style={footerStyles.column.ul}>
          <li style={footerStyles.column.li}>
            <a href="/categories" style={footerStyles.column.a}>
              {" "}
              Catogories
            </a>
          </li>
          <li style={footerStyles.column.li}>
            <a href="/orders" style={footerStyles.column.a}>
              {" "}
              My orders
            </a>
          </li>
        </ul>
      </Grid>

      <Grid item xs={4} md={2} style={footerStyles.column}>
        <h3 style={footerStyles.column.h3}>For Users</h3>
        <ul style={footerStyles.column.ul}>
          <li style={footerStyles.column.li}>
            <a href="/login" style={footerStyles.column.a}>
              Login as Buyer
            </a>
          </li>
          <li style={footerStyles.column.li}>
            <a href="/seller/login" style={footerStyles.column.a}>
              Login as Seller
            </a>
          </li>
          <li style={footerStyles.column.li}>
            <a href="/seller/register" style={footerStyles.column.a}>
              Register as Seller
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default Footer;
