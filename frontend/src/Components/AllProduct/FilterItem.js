import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Colors } from "../../Styles/Theme";
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      border: "none",
      borderRadius: "20px",
    },
    "&:hover fieldset": {
      border: "none",
    },
  },
});

const FilterItem = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilter = () => {
    onFilterChange(minPrice, maxPrice);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    onFilterChange("", "");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: { lg: "180px", md: "160px", sm: "140px", xs: "120px" },
          display: "flex",
          borderRadius: "20px",
          padding: "0px",
          margin: "2vw 1vw",
          position: "relative",
          bgcolor: "#ebeced",
          transition: "background-color 0.4s ease-in",
          "&:hover": {
            bgcolor: "#c7c8c9",
          },
        }}
      >
        <StyledTextField
          label="Min Price"
          size="small"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          width: { lg: "180px", md: "160px", sm: "140px", xs: "120px" },
          display: "flex",
          borderRadius: "20px",
          padding: "0px",
          margin: "2vw 1vw",
          position: "relative",
          bgcolor: "#ebeced",
          transition: "background-color 0.4s ease-in",
          "&:hover": {
            bgcolor: "#c7c8c9",
          },
        }}
      >
        <StyledTextField
          label="Max Price"
          size="small"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          width: { lg: "100px", md: "80px", sm: "60px", xs: "60px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2vw 1vw",
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          size="small"
        >
          Filter
        </Button>
      </Box>

      <Box
        sx={{
          width: { lg: "120px", md: "100px", sm: "80px", xs: "60px" },
          display: "flex",
          alignItems: "center",
          margin: "2vw 1vw",
          position: "relative",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleClearFilter}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
          }}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterItem;
