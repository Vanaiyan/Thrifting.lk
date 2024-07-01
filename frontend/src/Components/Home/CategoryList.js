import React from "react";
import CategoryCard from "../Cards/CategoriesCard";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Updated array of categories
const Categories = [
  { categoryName: "Photography", categorySymbol: "📷" },
  { categoryName: "Appliances", categorySymbol: "🔌" },
  { categoryName: "Furniture", categorySymbol: "🛋️" },
  { categoryName: "Clothing", categorySymbol: "👕" },
  { categoryName: "Shoes", categorySymbol: "👟" },
  { categoryName: "Electronics", categorySymbol: "📱" },
  { categoryName: "Books", categorySymbol: "📚" },
  { categoryName: "Toys", categorySymbol: "🧸" },
];

// Component to render the list of categories
const CategoriesList = () => {
  const navigate = useNavigate();

  // Function to handle category selection
  const handleCategoryClick = (categoryName) => {
    navigate(`/product/${categoryName}`); // Navigate to the products page with category name
  };

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
          onClick={() => handleCategoryClick(category.categoryName)} // Pass click handler to CategoryCard
        />
      ))}
    </Box>
  );
};

export default CategoriesList;
