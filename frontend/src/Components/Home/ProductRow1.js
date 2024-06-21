import React, { useEffect } from "react";
import Slider from "react-slick";
import ProductCardsm from "../Cards/ProductCardsm";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  fetchProducts,
  getRecommendations,
} from "../../Actions/homeProductActions"; // Adjust the path accordingly
import { Colors } from "../../Styles/Theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(user);
    console.log("Rec user : = ", user ? user._id : "");
    const fetchRecommendations = async () => {
      try {
        await dispatch(getRecommendations(user ? user._id : ""));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [dispatch, user]);

  const settings = {
    infinite: false,
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
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCardsm
            key={product.id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageSrc={product.pictures ? product.pictures[0].image : ""}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ProductRow;
