import React, { useState } from "react";
import Box from "@mui/material/Box";

const ProductImagesBox = ({ images }) => {
  const [activeImg, setActiveImage] = useState(images[0].image);

  return (
    <Box
      id="Two"
      height={600}
      width={600}
      borderRadius={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1px",
        boxSizing: "border-box",
      }}
    >
      <Box
        id="Three"
        width={500}
        height={450}
        sx={{ overflow: "hidden", marginBottom: "10px" }}
      >
        <img
          src={activeImg}
          alt="active-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {images &&
          images.map((img, index) => (
            <img
              key={index}
              src={img.image}
              alt={`img-${index}`}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => setActiveImage(img.image)}
              onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ProductImagesBox;
