import React from "react";
import { Grid, Typography } from "@mui/material";
import { StyledGrid } from "../../../Styles/SellerPage/ProductManageStyle";

const Product = ({ id, title, price, imageSrc,description }) => {
  return (
    <StyledGrid container justifyContent="center" alignItems="center">
        <Grid  >
        <img
        src={imageSrc}
        alt={title}
        style={{ width: "250px", height: "250px",borderRadius:'10px' }}
      />
        </Grid>
      
      <Grid>
      <Typography variant="h6">{title}</Typography>
      description
      <Typography variant="body1">{`$${price}`}</Typography>
      <Typography variant="body1">{`${description}`}</Typography>
      
      </Grid>
      
    </StyledGrid>
  );
};

export default Product;
