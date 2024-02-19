import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Colors } from "../../Styles/Theme";
import { Grid } from "@mui/material";

export default function CategoryCard({ categoryName, categorySymbol }) {
  return (
    <Card
      sx={{
        width: { lg: "250px", md: "200px", sm: "150px", xs: "150px" },
        height: { lg: "60px", md: "50px", sm: "40px", xs: "40px" },
        borderRadius: "10px",
        padding: "0",
        transition: "box-shadow 0.3s ease-in",
        "&:hover": {
          boxShadow: "0px 10px 33px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            height: { lg: "60px", md: "50px", sm: "40px", xs: "40px" },
          }}
        >
          {categorySymbol && (
            <Typography
              component="span"
              sx={{
                fontSize: 24,
                marginRight: "10px",
                color: Colors.primary,
              }}
            >
              {categorySymbol}
            </Typography>
          )}
        </Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: { lg: 16, md: 15, sm: 14, xs: 14 },
              fontWeight: 500,
              // width: "140px",
            }}
          >
            {categoryName}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
