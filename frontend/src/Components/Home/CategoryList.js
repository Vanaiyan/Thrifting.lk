import { Categories } from "../Categories";
import React from "react";
import CategoryCard from "../Cards/CategoriesCard";
import { Box } from "@mui/material";
const CategoriesList = () => {
  return (
    <Box
      sx={{
        margin: { lg: "0 7vw", md: "0 4vw", sm: "0 1vw", xs: "0" },
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {Categories.map((category, index) => (
        <CategoryCard
          key={index}
          categoryName={category.categoryName}
          categorySymbol={category.categorySymbol}
        />
      ))}
    </Box>
  );
};

export default CategoriesList;
