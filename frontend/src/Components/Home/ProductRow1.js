import React from "react";
import Slider from "react-slick";
import ProductCardsm from "../Cards/ProductCardsm";
import { Products } from "../Products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Colors } from "../../Styles/Theme";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: Colors.org2,
        position: "absolute",
        right: 0,
        top: "50%",
        marginRight: "20px", // Add margin between button and slider
      }}
    >
      <ArrowForwardIcon />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: Colors.org2,
        position: "absolute",
        left: 0,
        top: "50%",
        zIndex: 1,
        marginLeft: "20px", // Add margin between button and slider
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

const ProductRow = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    marginLeft: "10px",
    slidesToShow: 5.4,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4.6, // Rounded to the nearest whole number
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.8,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.6,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.6,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],

    nextArrow: <NextArrow />, // Custom next arrow component
    prevArrow: <PrevArrow />, // Custom previous arrow component
  };

  return (
    <Box
      sx={{
        width: { lg: "85vw", md: "95vw" },
        margin: "0 auto",
      }}
    >
      {" "}
      <Slider {...settings}>
        {Products.map((product) => (
          <ProductCardsm
            key={product.id}
            title={product.title}
            price={product.price}
            imageSrc={product.imageSrc}
            onAddToCartClick={() => {
              console.log(`Product ${product.id} added to cart`);
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ProductRow;
