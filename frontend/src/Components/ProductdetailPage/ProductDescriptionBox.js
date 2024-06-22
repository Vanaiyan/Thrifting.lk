// ProductDescriptionBox.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProductDescriptionBox = ({ description }) => {
  return (
    <Box
      id="Two"
      height={430}
      width={600}
      borderRadius={1}
      sx={{
        // border: '1px solid gray',
        paddingLeft: "20px",
        paddingTop: "4px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "600",
          paddingTop: "5px",
          fontSize: "18px",
          color: "#505050",
        }}
      >
        About this Item
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          paddingTop: "5px",
          paddingLeft: "20px",
          fontSize: "16px",
          color: "#8B96A5",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProductDescriptionBox;
