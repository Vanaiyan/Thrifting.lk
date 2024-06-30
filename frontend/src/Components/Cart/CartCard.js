import React, { useState, useEffect } from "react";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../Styles/Theme";
import { useDispatch } from "react-redux";
import { removeItem } from "../../Actions/cartActions";
import BuyNowBtn from "./BuyNowBtn";
import ChatWithSellerButton from "./ChatwithSellerbtn";
import ReportIssueButton from "./ReportIssueBtn";
import ConfirmPurchaseButton from "./ConfirmPurchaseBtn";
import DeleteDialog from "./DeleteDialog";
import InterestedDialog from "./InterestedDeleteDialog";
import RemainingTimeWarning from "./RemainingTimeWarning";
import { grey } from "@mui/material/colors";

// Utility function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const CartCard = ({
  productId,
  productName,
  price,
  description,
  cartTimestamp,
  interestedTimestamp,
  seller,
  isInterested,
  image,
}) => {
  const expirationHours = 24; // 24 hours in milliseconds
  const interestedExpirationHours = 48; // 48 hours in milliseconds
  const [remainingTime, setRemainingTime] = useState(null); // Initialize as null
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openInterestedDialog, setOpenInterestedDialog] = useState(false);
  const dispatch = useDispatch();

  const clickDelete = () => {
    if (isInterested) {
      setOpenInterestedDialog(true);
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const handleDeleteConfirmed = () => {
    dispatch(removeItem(productId));
    setOpenDeleteDialog(false);
    setOpenInterestedDialog(false);
  };

  const handleDeleteCancelled = () => {
    setOpenDeleteDialog(false);
    setOpenInterestedDialog(false);
  };

  useEffect(() => {
    const calculateRemainingTime = () => {
      const timestamp = isInterested
        ? new Date(interestedTimestamp).getTime()
        : new Date(cartTimestamp).getTime();
      const expiration = isInterested
        ? interestedExpirationHours
        : expirationHours;
      const timeNow = Date.now();
      const timeDifference =
        expiration * 60 * 60 * 1000 - (timeNow - timestamp);

      if (timeDifference <= 0) {
        return null; // Return null if timeDifference is 0 or negative
      }

      const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (hoursRemaining > 1) {
        return `${hoursRemaining} hours`;
      } else if (hoursRemaining === 1) {
        return `${hoursRemaining} hour`;
      } else if (minutesRemaining > 30) {
        return `about 1 hour`;
      } else {
        return `${minutesRemaining} minutes`;
      }
    };

    setRemainingTime(calculateRemainingTime());
  }, [cartTimestamp, interestedTimestamp, isInterested]);

  return (
    <Box
      padding={"15px"}
      border={"1px solid"}
      sx={{
        borderColor: isInterested ? "orange" : Colors.Inborder,
        borderRadius: "6px",
        transition: "box-shadow 0.2s ease-in",
        position: "relative",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          width={"170px"}
          height={"170px"}
          sx={{
            border: "1px solid",
            borderRadius: "6px",
            borderColor: Colors.Inborder,
            overflow: "hidden", // Ensures the image does not overflow the box
            display: "flex", // Centers the image inside the box
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the box while maintaining its aspect ratio
            }}
          />
        </Box>

        <IconButton
          aria-label="delete"
          color="error"
          size="small"
          sx={{
            justifyContent: "flex-end",
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
          onClick={clickDelete}
        >
          <CloseIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>

        <DeleteDialog
          open={openDeleteDialog}
          handleClose={handleDeleteCancelled}
          handleConfirm={handleDeleteConfirmed}
          productName={productName}
        />

        <InterestedDialog
          open={openInterestedDialog}
          handleClose={handleDeleteCancelled}
          handleConfirm={handleDeleteConfirmed}
          productName={productName}
        />

        <Stack spacing={1} height={"100%"} width={"100%"}>
          <Stack>
            {productName && (
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {truncateText(productName, 8)}{" "}
                {/* Truncate productName to 8 words */}
              </Typography>
            )}
          </Stack>
          {description && (
            <Typography variant="body2" color={grey[600]}>
              {truncateText(description, 20)}{" "}
              {/* Truncate description to 20 words */}
            </Typography>
          )}
          <Typography variant="subtitle2">LKR {price}</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" sx={{ color: Colors.InPholder }}>
              Remaining Time: {remainingTime}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"flex-end"}
          >
            {isInterested ? (
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                mt={"5px"}
              >
                <Stack direction={"row"}>
                  <ReportIssueButton
                    seller={seller}
                    productName={productName}
                    productId={productId}
                  />
                  <ChatWithSellerButton seller={seller} />
                </Stack>
                <ConfirmPurchaseButton
                  seller={seller}
                  productName={productName}
                  productId={productId}
                />
              </Stack>
            ) : (
              <BuyNowBtn
                seller={seller}
                productName={productName}
                productId={productId}
              />
            )}
          </Stack>
          {remainingTime && (
            <RemainingTimeWarning remainingTime={remainingTime} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartCard;
