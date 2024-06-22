import React, { useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/system";
import categories from "../Data/Category";

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

const SelectItem = ({ onCategoryChange }) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  const handleClearFilter = () => {
    setCategory("");
    onCategoryChange("");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: { lg: "220px", md: "200px", sm: "180px", xs: "160px" },
          display: "flex",
          borderRadius: "20px",
          padding: "0px",
          margin: "1vw",
          position: "relative",
          bgcolor: "#ebeced",
          transition: "background-color 0.4s ease-in",
          "&:hover": {
            bgcolor: "#c7c8c9",
          },
        }}
      >
        <StyledTextField
          label="Select Category"
          select
          size="small"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
        >
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </StyledTextField>
      </Box>

      <Box
        sx={{
          width: { lg: "120px", md: "100px", sm: "80px", xs: "60px" },
          display: "flex",
          alignItems: "center",
          margin: "2vw 0 2vw 0",
          position: "relative",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClearFilter}
          size="small"
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

export default SelectItem;
