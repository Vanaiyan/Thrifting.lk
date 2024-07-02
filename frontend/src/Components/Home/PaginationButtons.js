import React from "react";
import { Box, Button } from "@mui/material";

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Button
        key={i}
        variant={i === currentPage ? "contained" : "outlined"}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Button>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: "20px" }}>
      {pages}
    </Box>
  );
};

export default PaginationButtons;
