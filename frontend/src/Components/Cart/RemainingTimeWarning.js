import React from "react";
import { Stack, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

const RemainingTimeWarning = ({ remainingTime }) => {
  return remainingTime && parseInt(remainingTime) < 12 ? (
    <Stack direction="row" alignItems="center">
      <ReportIcon sx={{ color: "red" }} />
      <Typography variant="body2" color="red" ml={1}>
        This item will be removed from your cart in {remainingTime}.
      </Typography>
    </Stack>
  ) : null;
};

export default RemainingTimeWarning;
