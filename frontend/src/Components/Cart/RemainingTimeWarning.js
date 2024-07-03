import React from "react";
import { Stack, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

const RemainingTimeWarning = ({ remainingTime }) => {
  // console.log("Remainnnnnnn", remainingTime);

  // Assuming remainingTime is a string like "about 1 hour" or "30 minutes"
  const parsedTime = parseInt(remainingTime.match(/\d+/));

  // Check if remainingTime is less than 12 hours
  const isLessThanTwelveHours =
    (remainingTime.includes("hour") && parsedTime < 12) ||
    (remainingTime.includes("minutes") && parsedTime < 12);

  return isLessThanTwelveHours ? (
    <Stack direction="row" alignItems="center">
      <ReportIcon sx={{ color: "red" }} />
      <Typography variant="body2" color="red" ml={1}>
        This item will be removed from your cart in {remainingTime}.
      </Typography>
    </Stack>
  ) : null;
};

export default RemainingTimeWarning;
