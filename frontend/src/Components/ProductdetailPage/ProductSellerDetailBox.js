import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import sellerImg from "./SellerImages/seller.png";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Button from "@mui/material/Button";
import MessageIcon from "@mui/icons-material/Message";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { fetchSellerDetails } from "../../Actions/homeProductActions";

const ProductSellerDetailBox = ({ sellerId }) => {
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSellerDetails = async () => {
      try {
        const data = await fetchSellerDetails(sellerId);
        // console.log(data.seller);
        setSellerDetails(data.seller);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch seller details.");
        setLoading(false);
      }
    };

    loadSellerDetails();
  }, [sellerId]);

  if (loading) {
    return <div>Loading seller details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      id="Four"
      height={210}
      width={430}
      borderRadius={1}
      sx={{
        border: "1px solid #DEE2E7",
        paddingLeft: "20px",
        marginLeft: "25px",
        paddingRight: "20px",
        paddingTop: "4px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{ bgcolor: "#FF5003", height: "55px", width: "55px" }}
            alt="Seller"
            src={sellerImg} // You can update this with the actual seller image if available
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "18px", color: "#1C1C1C" }}
            >
              {sellerDetails?.role}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: "600", color: "#1C1C1C" }}
            >
              {`${sellerDetails?.firstName} ${sellerDetails?.lastName}`}
            </Typography>
            <Rating
              name="seller-rating"
              size="small"
              value={sellerDetails?.rating / 2}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>
        </Stack>
      </Box>
      <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: "7px", marginTop: "5px" }}
      >
        <LocationOnIcon sx={{ color: "#FF5003", fontSize: "25px" }} />
        <Typography variant="h6" sx={{ fontSize: "16px", color: "#8B96A5" }}>
          {sellerDetails?.addressField?.city},{" "}
          {sellerDetails?.addressField?.district}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "7px" }}>
        <VerifiedUserIcon sx={{ color: "#FF5003", fontSize: "25px" }} />
        <Typography variant="h6" sx={{ fontSize: "16px", color: "#8B96A5" }}>
          Verified Seller
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "7px" }}>
        <LocalShippingIcon sx={{ color: "#FF5003", fontSize: "25px" }} />
        <Typography variant="h6" sx={{ fontSize: "16px", color: "#8B96A5" }}>
          Islandwide Delivery
        </Typography>
      </Stack>

      {/* Seller Rating */}
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
          color: "#FF9017",
          marginBottom: "10px",
        }}
      ></Box>

      {/* <Button
        variant="contained"
        startIcon={<MessageIcon />}
        sx={{
          height: "32px",
          width: "390px",
          marginBottom: "15px",
          marginTop: "7px",
        }}
      >
        Message to Seller
      </Button>
      <Button
        variant="outlined"
        startIcon={<AssignmentIndIcon />}
        sx={{ height: "32px", width: "390px", marginBottom: "15px" }}
      >
        Seller's Profile
      </Button>
      <Button
        variant="outlined"
        startIcon={<VisibilityIcon />}
        sx={{ height: "32px", width: "390px", marginBottom: "15px" }}
      >
        View more from this Seller
      </Button> */}
    </Box>
  );
};

export default ProductSellerDetailBox;
