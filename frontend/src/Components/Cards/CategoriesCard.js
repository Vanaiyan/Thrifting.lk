import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Colors } from "../../Styles/Theme";
import { Grid, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CategoryCard({
  categoryName,
  categorySymbol,
  onClick,
}) {
  const handleClick = () => {
    onClick(categoryName); // Pass the category name to the parent handler
  };

  return (
    <Card
      sx={{
        width: { lg: "250px", md: "200px", sm: "150px", xs: "150px" },
        // height: { lg: "100px", md: "90px", sm: "80px", xs: "80px" },
        borderRadius: "10px",
        padding: "0",
        backgroundColor: grey[300],
        transition: "box-shadow 0.3s ease-in",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={handleClick}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        gap={2}
        sx={{
          height: "100%",
          padding: "0px",
        }}
      >
        <Avatar
          sx={{
            bgcolor: grey[300],
            width: "60px",
            height: "60px",
          }}
        >
          {categorySymbol && (
            <Typography
              component="span"
              sx={{
                fontSize: 24,
                color: Colors.primary,
              }}
            >
              {categorySymbol}
            </Typography>
          )}
        </Avatar>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: { lg: 16, md: 15, sm: 14, xs: 14 },
            fontWeight: 500,
          }}
        >
          {categoryName}
        </Typography>
      </Grid>
    </Card>
  );
}
